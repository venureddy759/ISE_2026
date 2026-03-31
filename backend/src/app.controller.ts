import { Controller, Get ,Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Backend is working benchod!";
  }

  @Get('stats') 
  getStats() {
    return {
      totalPolicies: 12000,
      categories: [
        { name: "Health", count: 30 },
        { name: "Finance", count: 40 },
        { name: "Education", count: 50 },
        { name: "Accounting", count: 30 },
        { name: "Banking", count: 40 },
        { name: "Industry", count: 50 },
      ],
    };
  }

  // 📢 Recent global policies
  @Get('policies/recent')
  getRecentPolicies() {
    return [
      { id: 1, title: "New Drug Regulation", date: "2026-03-01" },
      { id: 2, title: "GST Update for Small Shops", date: "2026-03-05" },
    ];
  }

  // 👤 User-specific policies
  @Get('policies/user/:userId')
  getUserPolicies(@Param('userId') userId: string) {
    return [
      { id: 101, title: `Policy for user ${userId}`, date: "2026-03-10" },
      { id: 102, title: "Local Business Tax Change", date: "2026-03-12" },
    ];
  }
}
