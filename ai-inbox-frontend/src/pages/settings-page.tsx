import { Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/i18n/use-translation";

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">{t("settings")}</p>
        <h1 className="mt-2 text-4xl font-extrabold">{t("workspacePreferences")}</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-6">
          <Globe2 className="h-5 w-5 text-sky-400" />
          <h2 className="mt-4 text-lg font-bold">{t("preferredLanguage")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("languageSavedInProfile")}
          </p>
        </Card>
        <Card className="p-6">
          <ShieldCheck className="h-5 w-5 text-sky-400" />
          <h2 className="mt-4 text-lg font-bold">{t("authentication")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("authenticationDescription")}
          </p>
        </Card>
        <Card className="p-6">
          <Sparkles className="h-5 w-5 text-sky-400" />
          <h2 className="mt-4 text-lg font-bold">{t("aiProviderSlots")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("aiProviderSlotsDescription")}
          </p>
        </Card>
      </div>
    </div>
  );
}
