import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AppModule } from "../src/app.module";
import { EmailFolder } from "../src/common/enums/email-folder.enum";
import { Email } from "../src/modules/emails/entities/email.entity";

async function moveInboxToSent() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const emailRepository = app.get<Repository<Email>>(getRepositoryToken(Email));

  const result = await emailRepository.update(
    { folder: EmailFolder.INBOX },
    { folder: EmailFolder.SENT },
  );

  console.log(`Moved ${result.affected ?? 0} email(s) from inbox to sent.`);

  await app.close();
}

void moveInboxToSent();
