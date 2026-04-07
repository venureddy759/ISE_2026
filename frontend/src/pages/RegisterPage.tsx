import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      alert("Registered successfully!");
      navigate("/");
    } else {
      alert("Fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        
        <h2 className="text-xl font-semibold text-center mb-4">
          Create an Account
        </h2>

        <p className="text-gray-500 text-center mb-4 text-sm">
          Join and stay updated with policies 📢
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;