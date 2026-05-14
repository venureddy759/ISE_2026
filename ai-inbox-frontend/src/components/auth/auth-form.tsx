import { Chrome, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth, googleProvider } from "@/firebase";
import { authService } from "@/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/i18n/use-translation";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@semanticinbox.app");
  const [password, setPassword] = useState("password123");
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response =
        mode === "login"
          ? await authService.login({ email, password })
          : await authService.register({ name, email, password });
      setSession(response.accessToken, response.user);
      toast.success(mode === "login" ? "Welcome back" : "Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(mode === "login" ? "Login failed. Check your email and password." : "Registration failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const response = await authService.google(token);
      setSession(response.accessToken, response.user);
      toast.success("Google authentication successful");
      navigate("/inbox");
    } catch (error) {
      toast.error("Google authentication failed. Check Firebase env values.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
          Semantic Inbox
        </p>
        <h1 className="mt-3 text-3xl font-extrabold">
          {mode === "login" ? t("signInWorkspace") : t("createWorkspace")}
        </h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "register" && (
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("name")}
            required
          />
        )}
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("email")}
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={t("password")}
          required
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : mode === "login" ? t("login") : t("register")}
        </Button>
        <Button
          className="w-full"
          type="button"
          variant="outline"
          disabled={loading}
          onClick={handleGoogleAuth}
        >
          <Chrome className="mr-2 h-4 w-4" />
          {mode === "login" ? t("loginWithGoogle") : t("registerWithGoogle")}
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        {mode === "login" ? t("needAccount") : t("alreadyHaveAccount")}{" "}
        <Link className="font-semibold text-sky-400" to={mode === "login" ? "/register" : "/login"}>
          {mode === "login" ? t("register") : t("login")}
        </Link>
      </p>
    </Card>
  );
}
