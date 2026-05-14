export const languageOptions = [
  { code: "bn-IN", label: "Bengali" },
  { code: "en-IN", label: "English" },
  { code: "gu-IN", label: "Gujarati" },
  { code: "hi-IN", label: "Hindi" },
  { code: "kn-IN", label: "Kannada" },
  { code: "ml-IN", label: "Malayalam" },
  { code: "mr-IN", label: "Marathi" },
  { code: "od-IN", label: "Odia" },
  { code: "pa-IN", label: "Punjabi" },
  { code: "ta-IN", label: "Tamil" },
  { code: "te-IN", label: "Telugu" },
] as const;

export type AppLanguage = (typeof languageOptions)[number]["code"];

type TranslationKey =
  | "account"
  | "actionItems"
  | "aiInbox"
  | "aiPrioritized"
  | "aiProviderSlots"
  | "aiProviderSlotsDescription"
  | "aiSummary"
  | "all"
  | "allMessages"
  | "alreadyHaveAccount"
  | "authentication"
  | "authenticationDescription"
  | "autoResolved"
  | "categories"
  | "closeSummary"
  | "college"
  | "compose"
  | "context"
  | "createWorkspace"
  | "dashboard"
  | "deadline"
  | "deadlines"
  | "delivered"
  | "draftReply"
  | "drafts"
  | "emailNotFound"
  | "email"
  | "finance"
  | "fullAiSummary"
  | "high"
  | "importantEmails"
  | "importantForYou"
  | "inbox"
  | "keyPoints"
  | "languageSavedInProfile"
  | "login"
  | "loginWithGoogle"
  | "low"
  | "mail"
  | "medium"
  | "meetings"
  | "messagesYouSent"
  | "name"
  | "needAccount"
  | "needsAttention"
  | "noActionItems"
  | "noEmailsAvailable"
  | "noExtractedTasks"
  | "noKeyPoints"
  | "noSuggestedReplies"
  | "openEmail"
  | "openFullEmail"
  | "original"
  | "password"
  | "payNow"
  | "personal"
  | "preferredLanguage"
  | "recommendedActions"
  | "register"
  | "registerWithGoogle"
  | "reply"
  | "reviewEmail"
  | "search"
  | "searchByIntent"
  | "searchMail"
  | "searchSentMail"
  | "seen"
  | "selectEmailSummary"
  | "sent"
  | "settings"
  | "setReminder"
  | "signInWorkspace"
  | "starred"
  | "suggestedNextSteps"
  | "suggestedReplies"
  | "suggestionsPanel"
  | "summary"
  | "translated"
  | "urgent"
  | "viewCalendar"
  | "viewFullSummary"
  | "waitingForReplies"
  | "work"
  | "workspacePreferences";

type TranslationMap = Record<TranslationKey, string>;

const en: TranslationMap = {
  account: "Account",
  actionItems: "Action items",
  aiInbox: "AI Inbox",
  aiPrioritized: "AI has prioritized what matters",
  aiProviderSlots: "AI provider slots",
  aiProviderSlotsDescription: "Sarvam AI will translate email content after integration.",
  aiSummary: "AI Summary",
  all: "All",
  allMessages: "All messages, labels, and email actions.",
  alreadyHaveAccount: "Already have an account?",
  authentication: "Authentication",
  authenticationDescription: "Your session and profile settings are managed securely.",
  autoResolved: "Auto Resolved",
  categories: "Categories",
  closeSummary: "Close summary",
  college: "College",
  compose: "Compose",
  context: "Context",
  createWorkspace: "Create your inbox workspace",
  dashboard: "Dashboard",
  deadline: "Deadline",
  deadlines: "Deadlines",
  delivered: "Delivered",
  draftReply: "Draft Reply",
  drafts: "Drafts",
  email: "Email",
  emailNotFound: "Email not found.",
  finance: "Finance",
  fullAiSummary: "Full AI Summary",
  high: "High",
  importantEmails: "important emails",
  importantForYou: "Important for you",
  inbox: "Inbox",
  keyPoints: "Key points",
  languageSavedInProfile: "This controls app labels only. Email content translation will use Sarvam AI.",
  login: "Login",
  loginWithGoogle: "Login with Google",
  low: "Low",
  mail: "Mail",
  medium: "Medium",
  meetings: "Meetings",
  messagesYouSent: "Messages you have sent.",
  name: "Name",
  needAccount: "Need an account?",
  needsAttention: "Needs Attention",
  noActionItems: "No action items found.",
  noEmailsAvailable: "No emails available yet.",
  noExtractedTasks: "No extracted tasks.",
  noKeyPoints: "No key points available.",
  noSuggestedReplies: "No suggested replies available.",
  openEmail: "Open Email",
  openFullEmail: "Open full email",
  original: "Original",
  password: "Password",
  payNow: "Pay Now",
  personal: "Personal",
  preferredLanguage: "Preferred language",
  recommendedActions: "Recommended Actions",
  register: "Register",
  registerWithGoogle: "Register with Google",
  reply: "Reply",
  reviewEmail: "Review email",
  search: "Search",
  searchByIntent: "Search by intent, not just keywords",
  searchMail: "Search mail",
  searchSentMail: "Search sent mail",
  seen: "Seen",
  selectEmailSummary: "Select an email to see its summary.",
  sent: "Sent",
  settings: "Settings",
  setReminder: "Set Reminder",
  signInWorkspace: "Sign in to your workspace",
  starred: "Starred",
  suggestedNextSteps: "Suggested next steps",
  suggestedReplies: "Suggested Replies",
  suggestionsPanel: "Suggestions Panel",
  summary: "Summary",
  translated: "Translated",
  urgent: "Urgent",
  viewCalendar: "View Calendar",
  viewFullSummary: "View Full Summary",
  waitingForReplies: "Waiting for Replies",
  work: "Work",
  workspacePreferences: "Workspace preferences",
};

const te: TranslationMap = {
  ...en,
  account: "ఖాతా",
  actionItems: "చర్య అంశాలు",
  aiInbox: "AI ఇన్‌బాక్స్",
  aiPrioritized: "ముఖ్యమైన వాటిని AI ముందుకు తెచ్చింది",
  all: "అన్నీ",
  allMessages: "అన్ని సందేశాలు, లేబుళ్లు, ఇమెయిల్ చర్యలు.",
  authentication: "ప్రామాణీకరణ",
  categories: "వర్గాలు",
  closeSummary: "సారాంశాన్ని మూసివేయి",
  college: "కాలేజ్",
  compose: "రాయండి",
  context: "సందర్భం",
  dashboard: "డాష్‌బోర్డ్",
  deadline: "గడువు",
  deadlines: "గడువులు",
  delivered: "చేరింది",
  draftReply: "ప్రత్యుత్తర ముసాయిదా",
  drafts: "ముసాయిదాలు",
  emailNotFound: "ఇమెయిల్ దొరకలేదు.",
  finance: "ఆర్థికం",
  fullAiSummary: "పూర్తి AI సారాంశం",
  high: "అధికం",
  importantEmails: "ముఖ్యమైన ఇమెయిళ్లు",
  importantForYou: "మీకు ముఖ్యమైనవి",
  inbox: "ఇన్‌బాక్స్",
  keyPoints: "ముఖ్యాంశాలు",
  languageSavedInProfile: "ఇది యాప్ లేబుళ్లకే వర్తిస్తుంది. ఇమెయిల్ కంటెంట్ అనువాదం Sarvam AI ద్వారా జరుగుతుంది.",
  login: "లాగిన్",
  low: "తక్కువ",
  mail: "మెయిల్",
  medium: "మధ్యస్థం",
  meetings: "సమావేశాలు",
  messagesYouSent: "మీరు పంపిన సందేశాలు.",
  name: "పేరు",
  needsAttention: "శ్రద్ధ అవసరం",
  noActionItems: "చర్య అంశాలు లేవు.",
  noEmailsAvailable: "ఇంకా ఇమెయిళ్లు లేవు.",
  noExtractedTasks: "సేకరించిన పనులు లేవు.",
  noKeyPoints: "ముఖ్యాంశాలు లేవు.",
  noSuggestedReplies: "సూచించిన ప్రత్యుత్తరాలు లేవు.",
  openEmail: "ఇమెయిల్ తెరవండి",
  openFullEmail: "పూర్తి ఇమెయిల్ తెరవండి",
  original: "మూలం",
  password: "పాస్‌వర్డ్",
  payNow: "ఇప్పుడే చెల్లించండి",
  personal: "వ్యక్తిగతం",
  preferredLanguage: "ప్రాధాన్య భాష",
  recommendedActions: "సిఫార్సు చేసిన చర్యలు",
  register: "నమోదు",
  reply: "ప్రత్యుత్తరం",
  reviewEmail: "ఇమెయిల్ పరిశీలించండి",
  search: "శోధన",
  searchMail: "మెయిల్ శోధించండి",
  searchSentMail: "పంపిన మెయిల్ శోధించండి",
  seen: "చూసింది",
  selectEmailSummary: "సారాంశం చూడడానికి ఒక ఇమెయిల్ ఎంచుకోండి.",
  sent: "పంపినవి",
  settings: "సెట్టింగులు",
  setReminder: "రిమైండర్ పెట్టండి",
  starred: "స్టార్ చేసినవి",
  suggestedReplies: "సూచించిన ప్రత్యుత్తరాలు",
  suggestionsPanel: "సూచనల ప్యానెల్",
  summary: "సారాంశం",
  translated: "అనువాదం",
  urgent: "అత్యవసరం",
  viewCalendar: "క్యాలెండర్ చూడండి",
  viewFullSummary: "పూర్తి సారాంశం చూడండి",
  waitingForReplies: "ప్రత్యుత్తరాల కోసం వేచి ఉన్నాయి",
  work: "పని",
  workspacePreferences: "వర్క్‌స్పేస్ ప్రాధాన్యతలు",
};

const dictionaries: Record<AppLanguage, TranslationMap> = {
  "bn-IN": { ...en },
  "en-IN": en,
  "gu-IN": { ...en },
  "hi-IN": { ...en },
  "kn-IN": { ...en },
  "ml-IN": { ...en },
  "mr-IN": { ...en },
  "od-IN": { ...en },
  "pa-IN": { ...en },
  "ta-IN": { ...en },
  "te-IN": te,
};

export function normalizeLanguage(language?: string | null): AppLanguage {
  if (language === "en") {
    return "en-IN";
  }

  return languageOptions.some((option) => option.code === language)
    ? (language as AppLanguage)
    : "en-IN";
}

export function translate(language: string | null | undefined, key: TranslationKey) {
  return dictionaries[normalizeLanguage(language)][key] ?? en[key];
}

export function translateValue(language: string | null | undefined, value: string) {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "");
  const keyByValue: Record<string, TranslationKey> = {
    all: "all",
    work: "work",
    personal: "personal",
    finance: "finance",
    college: "college",
    urgent: "urgent",
    meetings: "meetings",
    high: "high",
    medium: "medium",
    low: "low",
  };
  const key = keyByValue[normalized];

  return key ? translate(language, key) : value;
}
