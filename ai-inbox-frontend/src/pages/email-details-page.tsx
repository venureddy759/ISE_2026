import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { EmailDetail } from "@/components/inbox/email-detail";
import { Card } from "@/components/ui/card";
import { mockEmails } from "@/data/mock-emails";
import { aiService } from "@/services/ai-service";
import { emailService, normalizeEmail } from "@/services/email-service";
import { useInboxStore } from "@/store/inbox-store";

export function EmailDetailsPage() {
  const { emailId } = useParams();
  const location = useLocation();
  const emails = useInboxStore((state) => state.emails);
  const markAsRead = useInboxStore((state) => state.markAsRead);
  const storeEmail = useMemo(
    () => {
      const foundEmail =
        emails.find((item) => item.id === emailId) ?? mockEmails.find((item) => item.id === emailId);

      return foundEmail ? normalizeEmail(foundEmail) : undefined;
    },
    [emailId, emails],
  );
  const [email, setEmail] = useState(storeEmail);
  const backPath =
    typeof location.state === "object" &&
    location.state !== null &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : email?.folder === "sent"
        ? "/sent"
        : "/inbox";

  useEffect(() => {
    setEmail(storeEmail);
  }, [storeEmail]);

  useEffect(() => {
    if (!emailId || storeEmail) {
      return;
    }

    let cancelled = false;
    const requestedEmailId = emailId;
    async function fetchEmail() {
      try {
        const fetchedEmail = await emailService.getById(requestedEmailId);
        if (!cancelled) {
          setEmail(fetchedEmail);
        }
      } catch (error) {
        console.error(error);
      }
    }

    void fetchEmail();

    return () => {
      cancelled = true;
    };
  }, [emailId, storeEmail]);

  useEffect(() => {
    if (!email || email.isRead) {
      return;
    }

    setEmail({ ...email, isRead: true });
    void markAsRead(email.id);
  }, [email, markAsRead]);

  if (!email) {
    return <Card className="p-8">Email not found.</Card>;
  }

  return (
    <EmailDetail
      email={email}
      backPath={backPath}
      showSuggestionsPanel={email.folder !== "sent" && backPath !== "/sent"}
      onSummarize={async () => {
        const summarizedEmail = await aiService.summarizeEmail(email.id);
        setEmail(summarizedEmail);
      }}
      onTranslate={async () => {
        const translatedEmail = await aiService.translateEmail(email.id);
        setEmail(translatedEmail);
      }}
    />
  );
}
