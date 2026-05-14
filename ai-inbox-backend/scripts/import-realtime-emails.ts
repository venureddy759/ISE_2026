import "tsconfig-paths/register";
import * as fs from "fs";
import * as csv from "csv-parser";

import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AppModule } from "../src/app.module";
import { EmailCategory } from "../src/common/enums/email-category.enum";
import { EmailFolder } from "../src/common/enums/email-folder.enum";
import { EmailPriority } from "../src/common/enums/email-priority.enum";
import { Email } from "../src/modules/emails/entities/email.entity";

const CSV_PATH = process.env.REALTIME_EMAILS_CSV ?? "datasets/realtime-emails.csv";
const USER_ID = process.env.REALTIME_EMAILS_USER_ID ?? "7b636636-0b3b-461a-9add-fb5bdb522920";
const IMPORT_LIMIT = Number(process.env.REALTIME_EMAILS_LIMIT ?? 100);
const CLEAR_EMAILS = process.env.REALTIME_EMAILS_CLEAR === "true";

type RealtimeEmailRow = {
  "Email Address"?: string;
  Category?: string;
  Subcategory?: string;
  "Email Content"?: string;
  Timestamp?: string;
  Disposable?: string;
  Spam?: string;
  Language?: string;
};

const rows: RealtimeEmailRow[] = [];

function asBoolean(value?: string) {
  return value?.trim().toLowerCase() === "true";
}

function mapCategory(row: RealtimeEmailRow) {
  const text = `${row.Category ?? ""} ${row.Subcategory ?? ""} ${row["Email Content"] ?? ""}`.toLowerCase();

  if (text.includes("billing") || text.includes("invoice") || text.includes("payment") || text.includes("price")) {
    return EmailCategory.FINANCE;
  }

  if (text.includes("meeting") || text.includes("schedule") || text.includes("calendar")) {
    return EmailCategory.MEETINGS;
  }

  if (text.includes("work") || text.includes("project") || text.includes("task")) {
    return EmailCategory.WORK;
  }

  if (text.includes("college") || text.includes("university") || text.includes("student")) {
    return EmailCategory.COLLEGE;
  }

  return EmailCategory.PERSONAL;
}

function mapPriority(row: RealtimeEmailRow) {
  if (asBoolean(row.Spam) || asBoolean(row.Disposable)) {
    return EmailPriority.HIGH;
  }

  return EmailPriority.MEDIUM;
}

function mapLanguage(language?: string) {
  const normalized = language?.trim().toLowerCase();

  if (normalized === "english") {
    return "en-IN";
  }

  return normalized || "en-IN";
}

function buildSubject(row: RealtimeEmailRow) {
  const subcategory = row.Subcategory?.trim();
  const category = row.Category?.trim();

  if (subcategory && subcategory.toLowerCase() !== "general communication") {
    return subcategory;
  }

  return category ? `${category} email` : "Realtime email";
}

function parseDate(timestamp?: string) {
  const date = timestamp ? new Date(timestamp) : new Date();

  return Number.isNaN(date.getTime()) ? new Date() : date;
}

async function runImport() {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`CSV file not found: ${CSV_PATH}`);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const emailRepository = app.get<Repository<Email>>(getRepositoryToken(Email));

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on("data", (row: RealtimeEmailRow) => {
      rows.push(row);
    })
    .on("end", async () => {
      console.log("Total CSV rows:", rows.length);

      if (CLEAR_EMAILS) {
        await emailRepository.query(
          'TRUNCATE TABLE "email_replies", "emails" RESTART IDENTITY CASCADE',
        );
        console.log("Cleared existing emails table.");
      }

      const emailsToInsert: Partial<Email>[] = rows.slice(0, IMPORT_LIMIT).map((row) => {
        const sender = row["Email Address"]?.trim() || "unknown@example.com";
        const content = row["Email Content"]?.trim() || "Empty Email";

        return {
          userId: USER_ID,
          folder: EmailFolder.INBOX,
          sender,
          recipient: "user@example.com",
          subject: buildSubject(row),
          content,
          createdAt: parseDate(row.Timestamp),
          category: mapCategory(row),
          priority: mapPriority(row),
          language: mapLanguage(row.Language),
          isRead: false,
          summary: null,
          translatedContent: null,
        };
      });

      const newEmails: Partial<Email>[] = CLEAR_EMAILS ? emailsToInsert : [];

      if (!CLEAR_EMAILS) {
        for (const email of emailsToInsert) {
          const existingEmail = await emailRepository.findOne({
            where: {
              userId: email.userId,
              sender: email.sender,
              subject: email.subject,
              content: email.content,
            },
          });

          if (!existingEmail) {
            newEmails.push(email);
          }
        }
      }

      console.log("Parsed emails:", emailsToInsert.length);
      console.log("New emails to import:", newEmails.length);

      if (newEmails.length > 0) {
        await emailRepository.save(newEmails);
      }

      console.log("Realtime emails imported successfully!");

      await app.close();
    });
}

void runImport();
