import { Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { useComposeStore } from "@/store/compose-store";
import { useInboxStore } from "@/store/inbox-store";

type ComposeModalProps = {
  onSent: () => void;
};

export function ComposeModal({ onSent }: ComposeModalProps) {
  const user = useAuthStore((state) => state.user);
  const open = useComposeStore((state) => state.open);
  const draftEmail = useComposeStore((state) => state.draftEmail);
  const closeCompose = useComposeStore((state) => state.closeCompose);
  const { createEmail, updateEmail, removeEmail } = useInboxStore();
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setRecipient(draftEmail?.recipient ?? "");
    setSubject(draftEmail?.subject === "(No subject)" ? "" : (draftEmail?.subject ?? ""));
    setContent(draftEmail?.content === "No message content." ? "" : (draftEmail?.content ?? ""));
  }, [draftEmail, open]);

  if (!open) {
    return null;
  }

  const hasDraftContent = [recipient, subject, content].some((value) => value.trim().length > 0);

  function getEmailPayload(folder: "sent" | "draft") {
    if (!user || !hasDraftContent) {
      return null;
    }

    return {
      userId: user.id,
      folder,
      sender: user.name || user.email,
      recipient: recipient.trim() || "Unsaved recipient",
      subject: subject.trim() || "(No subject)",
      content: content.trim() || "No message content.",
      category: "Personal",
      priority: "Low",
      isRead: true,
    } as const;
  }

  async function saveDraft() {
    const payload = getEmailPayload("draft");
    if (!payload) {
      return null;
    }

    if (draftEmail) {
      return updateEmail(draftEmail.id, payload);
    }

    return createEmail(payload);
  }

  async function sendEmail() {
    const payload = getEmailPayload("sent");
    if (!payload) {
      return null;
    }

    const sentEmail = await createEmail(payload);

    if (draftEmail) {
      await removeEmail(draftEmail.id);
    }

    return sentEmail;
  }

  function resetForm() {
    setRecipient("");
    setSubject("");
    setContent("");
  }

  async function handleClose() {
    setSaving(true);
    try {
      await saveDraft();
      resetForm();
      closeCompose();
    } finally {
      setSaving(false);
    }
  }

  async function handleSend() {
    if (!hasDraftContent) {
      return;
    }

    setSaving(true);
    try {
      await sendEmail();
      resetForm();
      closeCompose();
      onSent();
    } finally {
      setSaving(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/40">
      <div className="fixed bottom-4 right-4 flex h-[min(640px,calc(100vh-2rem))] w-[min(620px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
        <div className="flex h-12 items-center justify-between border-b border-border/70 px-4">
          <h2 className="font-semibold">{draftEmail ? "Edit Draft" : "New Message"}</h2>
          <Button variant="ghost" size="icon" onClick={handleClose} disabled={saving}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 border-b border-border/70 p-4">
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            placeholder="To"
            disabled={saving}
          />
          <Input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Subject"
            disabled={saving}
          />
        </div>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your message..."
          className="min-h-0 flex-1 resize-none bg-background px-4 py-3 text-sm leading-7 outline-none placeholder:text-muted-foreground"
          disabled={saving}
        />

        <div className="flex items-center justify-between border-t border-border/70 p-4">
          <p className="text-xs text-muted-foreground">
            Closing saves a non-empty message to Drafts.
          </p>
          <Button onClick={handleSend} disabled={saving || !hasDraftContent}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
