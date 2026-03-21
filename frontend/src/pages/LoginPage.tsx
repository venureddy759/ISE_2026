import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../utils/auth";
import bgImage from "../assets/Images/Login_page_background.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      login();
      navigate("/dashboard");
    } else {
      alert("Enter credentials");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left side — background image */}
      <div
        className="flex-1 hidden md:block bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Optional dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Optional branding on top of image */}
        <div className="absolute bottom-10 left-10 text-grey">
          <h1 className="text-3xl font-bold tracking-tight">PolicyLens</h1>
          <p className="text-sm text-grey/70 mt-1">Secure. Compliant. Reliable.</p>
        </div>
      </div>

      {/* Right side — login panel */}
      <div className="w-full md:w-[420px] flex-shrink-0 bg-white flex items-center justify-center px-10 py-16 shadow-2xl" >
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1">Log in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-500 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-150 mt-2"
            >
              Log in
            </button>

          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline font-medium">
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default LoginPage;