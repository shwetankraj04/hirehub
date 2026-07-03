import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      login(response.data.user, response.data.token);

      alert("Login Successful");

      navigate("/");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden relative flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center pt-15">
        {/* Left Side */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

            <span className="text-sm text-zinc-300 font-medium">
              Secure Recruiter & Candidate Access
            </span>
          </div>

          <h1 className="text-6xl font-black leading-[1] tracking-tight text-white">
            Welcome
            <br />
            Back.
          </h1>

          <p className="text-zinc-400 text-lg leading-8 mt-8 max-w-xl">
            Access your HireHub dashboard to manage applications, track hiring,
            and connect with top opportunities seamlessly.
          </p>

          {/* Feature Points */}
          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>

              <p className="text-zinc-300 text-lg">
                Smart recruitment workflows
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>

              <p className="text-zinc-300 text-lg">Secure JWT authentication</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>

              <p className="text-zinc-300 text-lg">
                Unified candidate tracking
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="
            relative
            bg-white/10
            backdrop-blur-2xl
            border border-white/10
            shadow-2xl
            rounded-[32px]
            p-8 md:p-10
            "
          >
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white">Login</h1>

              <p className="text-zinc-400 mt-3">
                Continue your recruitment journey with HireHub.
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="
                w-full
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                px-4 py-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="
                w-full
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                px-4 py-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <button
              className="
              w-full
              bg-white text-black
              py-4
              rounded-2xl
              font-semibold
              text-lg
              hover:bg-zinc-200
              transition-all duration-300
              shadow-xl shadow-white/10
              hover:scale-[1.01]
              "
            >
              Login
            </button>

            {/* Footer */}
            <p className="text-zinc-400 text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-white font-medium hover:text-zinc-300 transition"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
