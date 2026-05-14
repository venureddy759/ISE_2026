import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { AppModule } from "../src/app.module";
import { EmailFolder } from "../src/common/enums/email-folder.enum";
import { Email } from "../src/modules/emails/entities/email.entity";

async function moveInboxToSent() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const emailRepository = app.get<Repository<Email>>(getRepositoryToken(Email));
  const moveLimit = Number(process.env.MOVE_SENT_LIMIT ?? 100);

  const emailsToMove = await emailRepository.find({
    where: { folder: EmailFolder.INBOX },
    order: { createdAt: "ASC" },
    take: moveLimit,
  });

  if (emailsToMove.length > 0) {
    await emailRepository.update(
      { id: In(emailsToMove.map((email) => email.id)) },
      { folder: EmailFolder.SENT },
    );
  }

  console.log(`Moved ${emailsToMove.length} email(s) from inbox to sent.`);

  await app.close();
}

void moveInboxToSent();
