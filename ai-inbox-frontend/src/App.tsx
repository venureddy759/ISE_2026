import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/app-shell";
import { ProtectedRoute } from "./routes/protected-route";
import { PublicRoute } from "./routes/public-route";
import { InboxPage } from "./pages/inbox-page";
import { AiInboxPage } from "./pages/ai-inbox-page";
import { BinPage } from "./pages/bin-page";
import { EmailDetailsPage } from "./pages/email-details-page";
import { DraftsPage } from "./pages/drafts-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { SearchResultsPage } from "./pages/search-results-page";
import { SentPage } from "./pages/sent-page";
import { StarredPage } from "./pages/starred-page";
import { SettingsPage } from "./pages/settings-page";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Navigate to="/inbox" replace />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/sent" element={<SentPage />} />
          <Route path="/drafts" element={<DraftsPage />} />
          <Route path="/starred" element={<StarredPage />} />
          <Route path="/bin" element={<BinPage />} />
          <Route path="/ai-inbox" element={<AiInboxPage />} />
          <Route path="/email/:emailId" element={<EmailDetailsPage />} />
          <Route path="/emails/:emailId" element={<EmailDetailsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
