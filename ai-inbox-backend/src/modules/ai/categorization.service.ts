import { Injectable } from "@nestjs/common";
import { EmailCategory } from "../../common/enums/email-category.enum";

@Injectable()
export class CategorizationService {
  categorize() {
    return {
      category: EmailCategory.WORK,
      confidence: 0.87,
    };
  }
}
