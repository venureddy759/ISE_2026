import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmailCategory } from "src/common/enums/email-category.enum";
import { EmailPriority } from "src/common/enums/email-priority.enum";
import { User } from "src/modules/users/entities/user.entity";
import { EmailReply } from "./email-reply.entity";

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  userId!: string;

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
  user!: User;

  @OneToMany(() => EmailReply, (emailReply) => emailReply.email, {
    cascade: true,
  })
  replies!: EmailReply[];
}
