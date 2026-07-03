import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (path) =>
    `relative pb-1 transition-all duration-300
     after:absolute after:left-0 after:-bottom-0.5
     after:h-[2px] after:w-0
     after:bg-white after:transition-all after:duration-300
     hover:after:w-full
     ${
       location.pathname === path
         ? "text-white after:w-full"
         : "text-zinc-400 hover:text-white"
     }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-white"
        >
          HireHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={navLink("/")}>
            Home
          </Link>

          <Link to="/jobs" className={navLink("/jobs")}>
            Jobs
          </Link>

          {!user ? (
            <>
              <Link to="/login" className={navLink("/login")}>
                Login
              </Link>

              <Link
                to="/register"
                className="
                bg-white text-black
                px-5 py-2.5
                rounded-xl
                font-semibold
                hover:bg-zinc-200
                transition-all duration-300
                shadow-lg shadow-white/10
                hover:scale-105
                "
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {user.role === "recruiter" && (
                <Link
                  to="/recruiter-dashboard"
                  className={navLink("/recruiter-dashboard")}
                >
                  Dashboard
                </Link>
              )}

              {user.role === "candidate" && (
                <Link
                  to="/candidate-dashboard"
                  className={navLink("/candidate-dashboard")}
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="
                bg-red-500/90 text-white
                px-5 py-2.5
                rounded-xl
                font-medium
                hover:bg-red-500
                transition-all duration-300
                hover:scale-105
                shadow-lg shadow-red-500/20
                "
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden
          transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-6 bg-zinc-950 border-t border-white/10">
          <div className="flex flex-col gap-5 pt-5 text-sm font-medium">
            <Link
              to="/"
              className="text-zinc-300 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="text-zinc-300 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-zinc-300 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-black px-5 py-3 rounded-xl text-center font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {user.role === "recruiter" && (
                  <Link
                    to="/recruiter-dashboard"
                    className="text-zinc-300 hover:text-white transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                {user.role === "candidate" && (
                  <Link
                    to="/candidate-dashboard"
                    className="text-zinc-300 hover:text-white transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-5 py-3 rounded-xl"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
