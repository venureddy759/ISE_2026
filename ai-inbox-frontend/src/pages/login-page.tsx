import { AuthForm } from "@/components/auth/auth-form";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <AuthForm mode="login" />
    </div>
  );
}
