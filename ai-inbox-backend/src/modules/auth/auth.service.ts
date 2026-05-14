import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { getFirebaseAdminApp } from "../../common/firebase/firebase";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { GoogleAuthDto } from "./dto/google-auth.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.buildAuthResponse(
      user.id,
      user.name,
      user.email,
      user.preferredLanguage,
    );
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(loginDto.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.buildAuthResponse(
      user.id,
      user.name,
      user.email,
      user.preferredLanguage,
    );
  }

  async googleAuth(googleAuthDto: GoogleAuthDto) {
    const firebaseAdminApp = getFirebaseAdminApp();
    const decoded = await firebaseAdminApp.auth().verifyIdToken(googleAuthDto.token);

    if (!decoded.email) {
      throw new UnauthorizedException("Google account email not available");
    }

    const user = await this.usersService.findOrCreateGoogleUser({
      email: decoded.email,
      name: decoded.name,
      preferredLanguage: "en-IN",
    });

    return this.buildAuthResponse(
      user.id,
      user.name,
      user.email,
      user.preferredLanguage,
    );
  }

  private buildAuthResponse(
    id: string,
    name: string,
    email: string,
    preferredLanguage: string,
  ) {
    const accessToken = this.jwtService.sign(
      { sub: id, email },
      {
        secret: this.configService.get<string>("JWT_SECRET", "super-secret-key"),
        expiresIn: 60 * 60 * 24,
      },
    );

    return {
      accessToken,
      user: {
        id,
        name,
        email,
        preferredLanguage,
      },
    };
  }
}
