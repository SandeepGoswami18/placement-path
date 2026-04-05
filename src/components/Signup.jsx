import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#0b1220] flex items-center justify-center">
      <div className="w-full flex justify-center px-4 ">
        <div
          className="w-[420px] 
          bg-[#1e293b]
          border-2  border-gray-700 
          rounded-2xl 
          shadow-2xl 
          p-8"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-8">
            Create an account
          </h1>

          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-blue-200 font-medium mb-2">
                Your email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg
                bg-[#374151]
                border border-gray-600 text-red-300 placeholder-blue-200
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg
                bg-[#374151]
                border border-gray-600
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-medium mb-2">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg
                bg-[#374151]
                border border-gray-600
                text-gray-700 placeholder-gray-800
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <p className="text-gray-300 text-sm">
                I accept the{" "}
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Terms and Conditions
                </span>
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white font-semibold transition"
            >
              Create an account
            </button>
          </form>

          {/* Footer */}
          <p className="text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;