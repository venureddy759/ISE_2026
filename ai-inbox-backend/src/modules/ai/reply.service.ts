import { Injectable } from "@nestjs/common";

@Injectable()
export class ReplyService {
  generateReplies(subject: string) {
    return [
      {
        type: "professional",
        content: `Mock professional reply for "${subject}".`,
      },
      {
        type: "friendly",
        content: `Mock friendly reply for "${subject}".`,
      },
      {
        type: "short",
        content: `Mock short reply for "${subject}".`,
      },
    ];
  }
}
