import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateEmailDto } from "./dto/create-email.dto";
import { CreateEmailReplyDto } from "./dto/create-email-reply.dto";
import { FilterEmailsDto } from "./dto/filter-emails.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { EmailsService } from "./emails.service";

type AuthenticatedRequest = {
  user: {
    userId: string;
    email: string;
  };
};

@Controller("emails")
@UseGuards(JwtAuthGuard)
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  findAll(
    @Query() filterEmailsDto: FilterEmailsDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.emailsService.findAll(filterEmailsDto, request.user.userId);
  }

  @Get("category/:category")
  findByCategory(
    @Param("category") category: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.emailsService.findByCategory(category, request.user.userId);
  }

  @Get(":id/replies")
  findReplies(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.emailsService.findReplies(id, request.user.userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.emailsService.findOne(id, request.user.userId);
  }

  @Post()
  create(
    @Body() createEmailDto: CreateEmailDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.emailsService.create(createEmailDto, request.user.userId);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmailDto: UpdateEmailDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.emailsService.update(id, updateEmailDto, request.user.userId);
  }

  @Patch(":id/read")
  markAsRead(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.emailsService.markAsRead(id, request.user.userId);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Req() request: AuthenticatedRequest) {
    return this.emailsService.remove(id, request.user.userId);
  }

  @Post(":id/replies")
  createReply(
    @Param("id") id: string,
    @Body() createEmailReplyDto: CreateEmailReplyDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.emailsService.createReply(
      id,
      createEmailReplyDto,
      request.user.userId,
    );
  }
}
