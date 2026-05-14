import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEmailDto } from "./dto/create-email.dto";
import { CreateEmailReplyDto } from "./dto/create-email-reply.dto";
import { FilterEmailsDto } from "./dto/filter-emails.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { EmailFolder } from "../../common/enums/email-folder.enum";
import { Email } from "./entities/email.entity";
import { EmailReply } from "./entities/email-reply.entity";

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email)
    private readonly emailsRepository: Repository<Email>,
    @InjectRepository(EmailReply)
    private readonly emailRepliesRepository: Repository<EmailReply>,
  ) {}

  async findAll(filterEmailsDto: FilterEmailsDto, userId: string) {
    const queryBuilder = this.emailsRepository
      .createQueryBuilder("email")
      .leftJoinAndSelect("email.replies", "replies")
      .leftJoinAndSelect("email.user", "user")
      .where("email.userId = :userId", { userId })
      .orderBy("email.createdAt", "DESC");

    if (filterEmailsDto.search) {
      queryBuilder.andWhere(
        "(LOWER(email.subject) LIKE LOWER(:search) OR LOWER(email.content) LIKE LOWER(:search))",
        { search: `%${filterEmailsDto.search}%` },
      );
    }

    if (filterEmailsDto.category) {
      queryBuilder.andWhere("email.category = :category", {
        category: filterEmailsDto.category,
      });
    }

    if (filterEmailsDto.folder) {
      queryBuilder.andWhere("email.folder = :folder", {
        folder: filterEmailsDto.folder,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string, userId?: string) {
    const email = await this.emailsRepository.findOne({
      where: userId ? { id, userId } : { id },
      relations: ["replies", "user"],
    });

    if (!email) {
      throw new NotFoundException("Email not found");
    }

    return email;
  }

  async create(createEmailDto: CreateEmailDto, userId?: string) {
    const email = this.emailsRepository.create({
      ...createEmailDto,
      userId: userId ?? createEmailDto.userId,
      translatedContent: createEmailDto.translatedContent ?? null,
      summary: createEmailDto.summary ?? null,
      folder: createEmailDto.folder,
      language: createEmailDto.language ?? "en",
      isRead: createEmailDto.isRead ?? false,
      isStarred: createEmailDto.isStarred ?? false,
    });

    return this.emailsRepository.save(email);
  }

  async update(id: string, updateEmailDto: UpdateEmailDto, userId?: string) {
    const email = await this.findOne(id, userId);
    const { userId: _ignoredUserId, ...safeUpdateEmailDto } = updateEmailDto;
    Object.assign(email, safeUpdateEmailDto);
    return this.emailsRepository.save(email);
  }

  async markAsRead(id: string, userId?: string) {
    const email = await this.findOne(id, userId);
    email.isRead = true;
    return this.emailsRepository.save(email);
  }

  async remove(id: string, userId?: string) {
    const email = await this.findOne(id, userId);
    email.folder = EmailFolder.BIN;
    return this.emailsRepository.save(email);
  }

  findByCategory(category: string, userId: string) {
    return this.emailsRepository.find({
      where: { category: category as Email["category"], userId },
      relations: ["replies", "user"],
      order: { createdAt: "DESC" },
    });
  }

  async findReplies(emailId: string, userId?: string) {
    await this.findOne(emailId, userId);
    return this.emailRepliesRepository.find({
      where: { emailId },
      order: { createdAt: "DESC" },
    });
  }

  async createReply(
    emailId: string,
    createEmailReplyDto: CreateEmailReplyDto,
    userId?: string,
  ) {
    await this.findOne(emailId, userId);

    const reply = this.emailRepliesRepository.create({
      emailId,
      ...createEmailReplyDto,
    });

    return this.emailRepliesRepository.save(reply);
  }
}
