import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmailCategory } from "../../../common/enums/email-category.enum";
import { EmailFolder } from "../../../common/enums/email-folder.enum";
import { EmailPriority } from "../../../common/enums/email-priority.enum";
import { User } from "../../users/entities/user.entity";
import { EmailReply } from "./email-reply.entity";

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  userId!: string;

  @Column({ type: "enum", enum: EmailFolder, default: EmailFolder.INBOX })
  folder!: EmailFolder;

  @Column()
  sender!: string;

  @Column()
  recipient!: string;

  @Column()
  subject!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "text", nullable: true })
  translatedContent!: string | null;

  @Column({ type: "text", nullable: true })
  summary!: string | null;

  @Column({ type: "enum", enum: EmailCategory })
  category!: EmailCategory;

  @Column({ type: "enum", enum: EmailPriority })
  priority!: EmailPriority;

  @Column({ default: "en" })
  language!: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.emails, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => EmailReply, (emailReply) => emailReply.email, {
    cascade: true,
  })
  replies!: EmailReply[];
}
