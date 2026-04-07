import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("google")
  async googleLogin(@Body() body: any) {
    const user = await this.authService.verifyGoogleToken(body.token);

    return {
      message: "Authenticated successfully",
      user,
    };
  }
}