import type { Email } from "@/types/email";

export const mockEmails: Email[] = [
  {
    id: "mail-1",
    folder: "inbox",
    sender: "Aarav Mehta",
    senderEmail: "aarav@projectlab.dev",
    recipient: "you@semanticinbox.app",
    subject: "Sprint review deck before tomorrow's demo",
    preview: "I've attached the talking points and need your quick input on slide three.",
    content:
      "Hi, can you review the sprint review deck before tomorrow's demo? Please focus on the metrics slide and update the delivery risks section. We should also confirm who will present the roadmap.",
    translatedContent:
      "Hola, ¿puedes revisar la presentación del sprint antes de la demostración de mañana? Por favor enfócate en la diapositiva de métricas y actualiza la sección de riesgos de entrega. También debemos confirmar quién presentará la hoja de ruta.",
    category: "Work",
    priority: "High",
    createdAt: "2026-05-13T08:30:00.000Z",
    isRead: false,
    isStarred: false,
    summary: {
      shortSummary: "Review a sprint review deck and confirm the demo presenter.",
      keyPoints: [
        "Check metrics slide",
        "Update delivery risks section",
        "Confirm roadmap presenter",
      ],
      actionItems: ["Revise slide three", "Reply with presenter confirmation"],
    },
    tasks: [
      { id: "task-1", text: "Update the metrics slide", completed: false },
      { id: "task-2", text: "Confirm roadmap presenter", completed: false },
    ],
    readReceipt: {
      status: "read",
      seenAt: "2026-05-13T09:12:00.000Z",
    },
  },
  {
    id: "mail-2",
    folder: "inbox",
    sender: "ICICI Bank Alerts",
    senderEmail: "alerts@icicibank.com",
    recipient: "you@semanticinbox.app",
    subject: "Statement ready for April 2026",
    preview: "Your monthly statement is available for download in the portal.",
    content:
      "Dear customer, your April 2026 account statement is now available. Please review the transaction summary and contact us if you notice any discrepancy.",
    translatedContent:
      "प्रिय ग्राहक, आपका अप्रैल 2026 खाता विवरण अब उपलब्ध है। कृपया लेन-देन सारांश की समीक्षा करें और किसी भी विसंगति की स्थिति में हमसे संपर्क करें।",
    category: "Finance",
    priority: "Medium",
    createdAt: "2026-05-12T10:00:00.000Z",
    isRead: true,
    isStarred: false,
    summary: {
      shortSummary: "Monthly bank statement is ready to review.",
      keyPoints: ["April statement available", "Verify transactions"],
      actionItems: ["Download statement", "Check for discrepancies"],
    },
    tasks: [{ id: "task-3", text: "Verify April transactions", completed: false }],
    readReceipt: {
      status: "delivered",
    },
  },
  {
    id: "mail-3",
    folder: "inbox",
    sender: "Placement Cell",
    senderEmail: "placements@college.edu",
    recipient: "you@semanticinbox.app",
    subject: "Interview slot confirmation",
    preview: "Your technical interview is scheduled for Friday at 11:30 AM.",
    content:
      "This is to confirm your interview slot for the campus recruitment drive. Please be available on Friday at 11:30 AM and bring your updated resume.",
    translatedContent:
      "This is to confirm your interview slot for the campus recruitment drive. Please be available on Friday at 11:30 AM and bring your updated resume.",
    category: "College",
    priority: "High",
    createdAt: "2026-05-11T14:15:00.000Z",
    isRead: false,
    isStarred: false,
    summary: {
      shortSummary: "Interview has been scheduled for Friday morning.",
      keyPoints: ["Friday at 11:30 AM", "Bring updated resume"],
      actionItems: ["Prepare resume", "Arrive before the scheduled time"],
    },
    tasks: [{ id: "task-4", text: "Print updated resume", completed: false }],
    readReceipt: {
      status: "sent",
    },
  },
];
