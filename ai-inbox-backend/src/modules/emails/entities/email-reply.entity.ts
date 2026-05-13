import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Email } from "./email.entity";

@Entity("email_replies")
export class EmailReply {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  emailId!: string;

  @Column()
  replyType!: string;

  @Column({ type: "text" })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Email, (email) => email.replies, { onDelete: "CASCADE" })
  email!: Email;
}
