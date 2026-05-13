import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateEmailDto } from "./dto/create-email.dto";
import { CreateEmailReplyDto } from "./dto/create-email-reply.dto";
import { FilterEmailsDto } from "./dto/filter-emails.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { EmailsService } from "./emails.service";

@Controller("emails")
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  findAll(@Query() filterEmailsDto: FilterEmailsDto) {
    return this.emailsService.findAll(filterEmailsDto);
  }

  @Get("category/:category")
  findByCategory(@Param("category") category: string) {
    return this.emailsService.findByCategory(category);
  }

  @Get(":id/replies")
  findReplies(@Param("id") id: string) {
    return this.emailsService.findReplies(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.emailsService.findOne(id);
  }

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.create(createEmailDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailsService.update(id, updateEmailDto);
  }

  @Patch(":id/read")
  markAsRead(@Param("id") id: string) {
    return this.emailsService.markAsRead(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.emailsService.remove(id);
  }

  @Post(":id/replies")
  createReply(
    @Param("id") id: string,
    @Body() createEmailReplyDto: CreateEmailReplyDto,
  ) {
    return this.emailsService.createReply(id, createEmailReplyDto);
  }
}
