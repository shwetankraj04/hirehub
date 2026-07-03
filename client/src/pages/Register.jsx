import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
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
      // Register User
      await API.post("/auth/register", formData);

      // Auto Login
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      login(response.data.user, response.data.token);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Registration Failed");
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

            <span className="text-sm text-zinc-300 font-medium">
              Join The Future Of Smart Recruitment
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-black leading-[1] tracking-tight text-white">
            Create Your
            <br />
            HireHub Account.
          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-lg leading-8 mt-8 max-w-xl">
            Start your recruitment journey with a premium hiring platform built
            for recruiters and candidates to collaborate seamlessly.
          </p>

          {/* Features */}
          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>

              <p className="text-zinc-300 text-lg">
                AI-powered recruitment workflows
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>

              <p className="text-zinc-300 text-lg">
                Unified candidate tracking system
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>

              <p className="text-zinc-300 text-lg">
                Secure role-based authentication
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="relative lg:pt-8">
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
            rounded-[32px] max-w-[520px] ml-auto
            p-8 md:p-10
            "
          >
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Register</h1>

              <p className="text-zinc-400 mt-3">
                Create your account and explore opportunities with HireHub.
              </p>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
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

            {/* Email */}
            <div className="mb-4">
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
            <div className="mb-4">
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

            {/* Role */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Account Type
              </label>

              <select
                name="role"
                className="
                w-full
                bg-white/5
                border border-white/10
                text-white
                px-4 py-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
                onChange={handleChange}
              >
                <option value="candidate" className="bg-zinc-900 text-white">
                  Candidate
                </option>

                <option value="recruiter" className="bg-zinc-900 text-white">
                  Recruiter
                </option>
              </select>
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
              Create Account
            </button>

            {/* Footer */}
            <p className="text-zinc-400 text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white font-medium hover:text-zinc-300 transition"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
