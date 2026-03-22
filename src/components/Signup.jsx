import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful 🎉");
        navigate("/login");
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-background grid-bg">

      {/* 🔥 OUTER WRAPPER */}
      <div className="w-full max-w-md px-6">

        {/* 🔥 CARD */}
        <div className="p-6 
        bg-card/80 backdrop-blur-xl 
        border border-border 
        rounded-2xl shadow-xl shadow-purple-500/10">

          {/* Heading */}
          <h2 className="text-xl font-semibold text-center mb-5 glow-text">
            Create your account
          </h2>

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-3 mb-3 rounded-lg 
            bg-background border border-input 
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary 
            transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 mb-3 rounded-lg 
            bg-background border border-input 
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary 
            transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-3 mb-4 rounded-lg 
            bg-background border border-input 
            text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary 
            transition"
          />

          {/* Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full h-10 rounded-lg 
            bg-primary text-primary-foreground 
            font-medium 
            hover:scale-105 hover:shadow-md hover:shadow-purple-500/20
            transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Bottom */}
          <p className="text-xs text-center mt-4 text-muted-foreground">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;