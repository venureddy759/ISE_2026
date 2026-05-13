import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import bgImage from "../assets/Images/Login_page_background.jpg";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import useRotatingIndianTitle from "../hooks/useRotatingIndianTitle";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const brandVariant = useRotatingIndianTitle();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const token = await user.getIdToken();

      console.log("JWT Token:", token);

      await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      console.log("Token sent to backend successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#111827_10%,#eff6ff_35%,#f8fafc_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_26%)]" />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <section className="relative hidden flex-1 items-end px-6 pb-6 pt-6 sm:px-8 lg:flex lg:px-10 lg:pb-10 lg:pt-10">
          <div
            className="absolute inset-4 hidden rounded-[36px] bg-cover bg-center shadow-[0_30px_80px_rgba(15,23,42,0.35)] lg:block"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 rounded-[36px] bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.72))]" />
          </div>

          <div className="relative w-full lg:max-w-[540px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-sky-100 backdrop-blur">
              <ShieldCheck size={14} />
              Secure Access • {brandVariant.current.text}
            </div>

            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              Policy access that feels calm and secure.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
              Sign in to review updates and manage your policy workspace from one clean dashboard.
            </p>

            {/* <p className="mt-4 text-lg font-medium tracking-wide text-sky-100">
              {brandVariant.current.text} is your gateway to a world of policy insights, where you can explore, analyze, and stay informed with ease.
            </p> */}

          </div>
        </section>

        <section className="flex w-full items-center justify-center px-4 py-4 sm:px-6 lg:w-[500px] lg:px-8 lg:py-6">
          <div className="w-full max-w-md rounded-[30px] border border-slate-200/70 bg-white/92 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  <ShieldCheck size={14} />
                  {brandVariant.current.text}
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-slate-900">
                  Log in to continue to your workspace.
                </p>
              </div>

            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition focus-within:border-sky-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <a href="#" className="text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 transition focus-within:border-sky-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100">
                  <Lock size={18} className="text-slate-400" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-slate-800 active:scale-[0.99]"
              >
                Log in
                <ArrowRight size={16} />
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs uppercase tracking-[0.22em] text-slate-400">or continue with</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="h-5 w-5"
                />
                Continue with Google
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-700 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
