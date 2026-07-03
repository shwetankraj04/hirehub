import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { LayoutDashboard, PlusCircle, Briefcase, Users } from "lucide-react";

const RecruiterLayout = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const navItems = [
    {
      name: "Overview",
      path: "/recruiter-dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Create Job",
      path: "/recruiter-dashboard/create-job",
      icon: PlusCircle,
    },
    {
      name: "My Jobs",
      path: "/recruiter-dashboard/my-jobs",
      icon: Briefcase,
    },
    {
      name: "Applications",
      path: "/recruiter-dashboard/applications",
      icon: Users,
    },
  ];
  return (
    <div className="h-screen flex relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Purple Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/30 blur-3xl rounded-full" />

        {/* Blue Glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-3xl rounded-full" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
        linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
      `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      {/* Sidebar */}
      <aside className="relative z-10 w-72 h-screen flex-shrink-0 border-r border-white/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div
              className="
    w-12 h-12
    rounded-xl
    bg-gradient-to-br
    from-purple-500
    to-violet-700
    flex items-center justify-center
    text-white
    font-bold
    text-xl
    shadow-lg shadow-purple-500/30
    "
            >
              HH
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">HireHub</h1>
            </div>
          </div>
          <nav className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/recruiter-dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? `
              bg-white
              text-purple-600
              font-semibold
              shadow-lg
              shadow-purple-500/30
              border
              border-purple-300/20
            `
                        : "text-zinc-400 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={20}
                        className={
                          isActive ? "text-purple-600" : "text-zinc-400"
                        }
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <button
            onClick={() => navigate("/recruiter-dashboard/profile")}
            className="
  w-full
  text-left
  bg-white/10
  border
  border-purple-500/20
  rounded-3xl
  p-4
  mb-4
  hover:bg-white/15
  transition-all
  duration-300
  "
          >
            <div className="flex items-center gap-3">
              <div
                className="
      w-14
      h-14
      rounded-full
      bg-gradient-to-br
      from-purple-500
      to-blue-500
      flex
      items-center
      justify-center
      text-white
      font-bold
      text-lg
      "
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <p className="text-white font-semibold">{user?.name}</p>

                <p className="text-zinc-400 text-sm">{user?.email}</p>

                <div className="mt-3">
                  <span
                    className="
          text-xs
          bg-purple-500/20
          text-purple-300
          px-3
          py-1
          rounded-full
          "
                  >
                    View Profile →
                  </span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="
                w-full
                bg-red-500/15
                border
                border-red-500/20
                text-red-400
                py-3
                rounded-2xl
                font-semibold
                hover:bg-red-500/25
                transition-all duration-300
                "
          >
            Logout
          </button>
        </div>
      </aside>
      {/* Page Content */}
      <main className="relative z-10 flex-1 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;
