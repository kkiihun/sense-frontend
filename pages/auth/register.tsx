import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: register logic
    console.log("회원가입 정보:", form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-600 to-red-500 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none"
          />
          <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-semibold">
            회원가입
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          이미 계정이 있으신가요? <a href="/login" className="underline font-semibold">로그인</a>
        </p>
      </div>
    </div>
  );
}
