import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-zinc-950 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

                <span className="text-sm text-zinc-300 font-medium">
                  Modern AI-Powered Recruitment Platform
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1] tracking-tight text-white">
                Hire Smarter.
                <br />
                Grow Faster.
              </h1>

              <p className="text-zinc-400 text-lg leading-8 mt-8 max-w-2xl">
                A modern applicant tracking platform that helps recruiters hire
                efficiently while enabling candidates to discover meaningful
                career opportunities.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  to="/jobs"
                  className="
                  bg-white text-black
                  px-8 py-4
                  rounded-2xl
                  text-lg font-semibold
                  hover:bg-zinc-200
                  transition-all duration-300
                  shadow-2xl shadow-white/10
                  hover:scale-[1.02]
                  text-center
                  "
                >
                  Explore Jobs
                </Link>

                <Link
                  to="/register"
                  className="
                  bg-white/10 border border-white/10
                  text-white
                  px-8 py-4
                  rounded-2xl
                  text-lg font-semibold
                  hover:bg-white/15
                  backdrop-blur-xl
                  transition-all duration-300
                  text-center
                  "
                >
                  Get Started
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-10 mt-14">
                <div>
                  <h3 className="text-3xl font-bold text-white">10K+</h3>
                  <p className="text-zinc-500 mt-1">Active Candidates</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">500+</h3>
                  <p className="text-zinc-500 mt-1">Companies Hiring</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">95%</h3>
                  <p className="text-zinc-500 mt-1">Hiring Efficiency</p>
                </div>
              </div>
            </div>

            {/* Right Dashboard */}
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>

              {/* Dashboard Card */}
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-zinc-400 text-sm">
                      Recruitment Analytics
                    </p>

                    <h2 className="text-4xl font-bold text-white mt-2">
                      Dashboard Overview
                    </h2>
                  </div>

                  <div className="bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl font-semibold">
                    +18%
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Smart Recruitment",
                      desc: "Create jobs, manage applications, and track candidates seamlessly.",
                      color: "bg-emerald-500",
                    },
                    {
                      title: "Candidate Dashboard",
                      desc: "Track applications and opportunities in one unified platform.",
                      color: "bg-blue-500",
                    },
                    {
                      title: "Secure Authentication",
                      desc: "Protected recruiter and candidate workflows with JWT security.",
                      color: "bg-purple-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      p-5
                      hover:bg-white/10
                      transition-all duration-300
                      "
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {item.title}
                          </h3>

                          <p className="text-zinc-400 mt-3 leading-7">
                            {item.desc}
                          </p>
                        </div>

                        <div
                          className={`w-3 h-3 rounded-full mt-2 ${item.color}`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
