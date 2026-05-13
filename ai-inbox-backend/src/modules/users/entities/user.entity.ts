import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Email } from "src/modules/emails/entities/email.entity";
import { SearchHistory } from "src/modules/search/entities/search-history.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "en" })
  preferredLanguage!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Email, (email) => email.user)
  emails!: Email[];

  @OneToMany(() => SearchHistory, (searchHistory) => searchHistory.user)
  searchHistory!: SearchHistory[];
}
