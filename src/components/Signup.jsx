import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    console.log("🔥 Button clicked");

    // 🔒 Basic validation
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
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      console.log("✅ Response:", data);

      if (res.ok) {
        alert("Signup successful 🎉");

        // 🔄 reset form
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (error) {
      console.log("❌ Error:", error);
      alert("Server error (check backend)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Signup Page</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Signup;