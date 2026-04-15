import { Controller, Get ,Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("Hello World!");
    return "Backend is working fine!";
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
    {
      id: 1,
      title: "New Drug Regulation",
      date: "2026-03-01",
      description:
        "This policy introduces updated regulations for drug approval and distribution across pharmacies.",
    },
    {
      id: 2,
      title: "GST Update for Small Shops",
      date: "2026-03-05",
      description:
        "New GST rules applicable to small retail shops with simplified tax filing procedures.",
    },
  ];
}

// 👤 User-specific policies
@Get('policies/user/:userId')
getUserPolicies(@Param('userId') userId: string) {
  return [
    {
      id: 101,
      title: `Policy for user ${userId}`,
      date: "2026-03-10",
      description:
        "Custom policy tailored based on user business type and compliance requirements.",
    },
    {
      id: 102,
      title: "Local Business Tax Change",
      date: "2026-03-12",
      description:
        "Changes in local taxation rules affecting small and medium businesses.",
    },
  ];
}
}
