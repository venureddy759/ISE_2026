import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AiModule } from "./modules/ai/ai.module";
import { AuthModule } from "./modules/auth/auth.module";
import { EmailsModule } from "./modules/emails/emails.module";
import { EmailReply } from "./modules/emails/entities/email-reply.entity";
import { Email } from "./modules/emails/entities/email.entity";
import { SearchModule } from "./modules/search/search.module";
import { SearchHistory } from "./modules/search/entities/search-history.entity";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/entities/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres" as const,
        host: configService.get<string>("DB_HOST"),
        port: Number(configService.get<string>("DB_PORT")),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [User, Email, EmailReply, SearchHistory],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    EmailsModule,
    AiModule,
    SearchModule,
  ],
})
export class AppModule {}
