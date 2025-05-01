import React, { useState } from "react";
import userApi from "../services/userApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await userApi.post("/api/auth/login", form);
      if (res.status === 200) {
        console.log("Logged in successfully");
        localStorage.setItem("token", res?.data?.token || '');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
