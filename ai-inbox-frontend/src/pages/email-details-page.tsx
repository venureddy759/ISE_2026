import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { EmailDetail } from "@/components/inbox/email-detail";
import { Card } from "@/components/ui/card";
import { mockEmails } from "@/data/mock-emails";
import { normalizeEmail } from "@/services/email-service";
import { useInboxStore } from "@/store/inbox-store";

export function EmailDetailsPage() {
  const { emailId } = useParams();
  const emails = useInboxStore((state) => state.emails);
  const email = useMemo(
    () => {
      const foundEmail =
        emails.find((item) => item.id === emailId) ?? mockEmails.find((item) => item.id === emailId);

      return foundEmail ? normalizeEmail(foundEmail) : undefined;
    },
    [emailId, emails],
  );

  if (!email) {
    return <Card className="p-8">Email not found.</Card>;
  }

  return <EmailDetail email={email} />;
}
