import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      {/* 🔥 CARD */}
      <div className="w-full max-w-xs p-5 bg-background border border-border rounded-xl shadow-md">

        {/* Heading */}
        <h2 className="text-lg font-semibold text-center mb-5">
          Login to PrepArena
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-9 px-3 mt-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-4 h-9 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition"
        >
          Log In
        </button>

        {/* Bottom */}
        <p className="text-xs text-center mt-3 text-muted-foreground">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primary cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;