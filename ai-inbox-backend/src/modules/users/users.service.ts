import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find({
      relations: ["emails", "searchHistory"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ["emails", "searchHistory"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      preferredLanguage: createUserDto.preferredLanguage ?? "en-IN",
    });

    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { message: "User deleted successfully" };
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOrCreateGoogleUser(payload: {
    email: string;
    name?: string;
    preferredLanguage?: string;
  }) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      return existingUser;
    }

    const user = this.usersRepository.create({
      name: payload.name ?? payload.email.split("@")[0] ?? "Google User",
      email: payload.email,
      password: "",
      preferredLanguage: payload.preferredLanguage ?? "en-IN",
    });

    return this.usersRepository.save(user);
  }
}
