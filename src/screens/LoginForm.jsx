import { useState } from "react";
import { login } from "../services/authService";
import logo from "../assets/Nabil Auto Service Logo.jpg";

const LoginForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      window.location.href = "/admin-dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-automotive-blue to-automotive-charcoal text-white p-12">
        <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome Back!
        </h2>
        <p className="text-lg opacity-80 mb-8 max-w-md text-center">
          Log in to manage your auto service dashboard and keep your business
          running smoothly.
        </p>
        <img
          src={logo}
          alt="Nabil Auto Service Logo"
          className="w-3/4 rounded-xl shadow-lg"
        />
      </div>
      {/* Right Panel (Form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10"
        >
          <h2 className="text-3xl font-bold text-automotive-blue mb-6 text-center">
            Admin Login
          </h2>
          {error && (
            <div className="text-red-600 mb-4 text-center font-semibold">
              {error}
            </div>
          )}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-automotive-blue"
              required
              autoFocus
            />
          </div>
          <div className="mb-8">
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-automotive-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-automotive-red hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
