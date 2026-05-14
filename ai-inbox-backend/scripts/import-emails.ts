import "tsconfig-paths/register";
import * as fs from "fs";
import * as csv from "csv-parser";

import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AppModule } from "../src/app.module";

import { Email } from "../src/modules/emails/entities/email.entity";

import { EmailCategory } from "../src/common/enums/email-category.enum";
import { EmailFolder } from "../src/common/enums/email-folder.enum";
import { EmailPriority } from "../src/common/enums/email-priority.enum";

const results: any[] = [];

const USER_ID = process.env.EMAIL_IMPORT_USER_ID ?? "7b636636-0b3b-461a-9add-fb5bdb522920";
const IMPORT_LIMIT = Number(process.env.EMAIL_IMPORT_LIMIT ?? 100);

function extractField(text: string, field: string): string {
  const regex = new RegExp(`${field}: (.*)`);

  const match = text.match(regex);

  return match ? match[1].trim() : "";
}

function extractBody(text: string): string {
  const splitText = text.split("X-FileName:");

  if (splitText.length < 2) {
    return "";
  }

  const afterHeaders = splitText[1];

  const firstNewline = afterHeaders.indexOf("\n");

  return afterHeaders.slice(firstNewline).trim();
}

async function runImport() {
  const app = await NestFactory.createApplicationContext(
    AppModule,
  );

  const emailRepository =
    app.get<Repository<Email>>(
      getRepositoryToken(Email),
    );

  fs.createReadStream("datasets/dataset.csv")
    .pipe(csv())

    .on("data", (data) => {
      results.push(data);
    })

    .on("end", async () => {
      console.log(
        "Total CSV rows:",
        results.length,
      );

      const emailsToInsert: Partial<Email>[] = [];

      for (let i = 0; i < Math.min(IMPORT_LIMIT, results.length); i++) {
        try {
          const rawEmail = results[i].message;

          const parsedEmail: Partial<Email> = {
            userId: USER_ID,

            folder:
              EmailFolder.SENT,

            sender:
              extractField(rawEmail, "From") ||
              "unknown@enron.com",

            recipient:
              extractField(rawEmail, "To") ||
              "unknown@enron.com",

            subject:
              extractField(rawEmail, "Subject") ||
              "No Subject",

            content:
              extractBody(rawEmail) ||
              "Empty Email",

            createdAt: new Date(
              extractField(rawEmail, "Date"),
            ),

            category:
              EmailCategory.PERSONAL,

            priority:
              EmailPriority.MEDIUM,

            language: "en",

            isRead: false,

            summary: null,

            translatedContent: null,
          };

          emailsToInsert.push(parsedEmail);
        } catch (error) {
          console.log(
            `Skipping malformed email at row ${i}`,
          );
        }
      }

      console.log(
        "Parsed emails:",
        emailsToInsert.length,
      );

      const newEmails: Partial<Email>[] = [];

      for (const email of emailsToInsert) {
        const existingEmail = await emailRepository.findOne({
          where: {
            userId: email.userId,
            folder: email.folder,
            sender: email.sender,
            recipient: email.recipient,
            subject: email.subject,
            content: email.content,
          },
        });

        if (!existingEmail) {
          newEmails.push(email);
        }
      }

      console.log(
        "New emails to import:",
        newEmails.length,
      );

      if (newEmails.length > 0) {
        await emailRepository.save(newEmails);
      }

      console.log(
        "Emails imported successfully!",
      );

      await app.close();
    });
}

runImport();
