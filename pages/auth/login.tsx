import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("로그인 시도: " + email);
    // TODO: API 연동
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-600 to-purple-500 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white text-black outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white text-black outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="#" className="text-blue-200 hover:underline">Forget Password</a>
          </div>

          <button type="submit" className="w-full py-2 bg-white text-purple-800 font-semibold rounded hover:bg-gray-100">
            login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Don't have an account? <a href="#" className="text-blue-200 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
