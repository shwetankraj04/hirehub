import { useEffect, useState, useContext } from "react";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

const CandidateDashboard = () => {
  const { token } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await API.get("/jobs/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Selected":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20";

      case "Rejected":
        return "bg-red-500/20 text-red-400 border border-red-500/20";

      case "Shortlisted":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20";

      default:
        return "bg-blue-500/20 text-blue-400 border border-blue-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-32">
        {/* Heading */}
        <div className="mb-14">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

            <span className="text-sm text-zinc-300 font-medium">
              Candidate Application Dashboard
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1]">
            My Applications
          </h1>

          {/* Description */}
          <p className="text-zinc-400 mt-6 text-xl max-w-3xl leading-8">
            Track your applications, monitor recruitment progress, and stay
            updated with your hiring journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6">
            <p className="text-zinc-400 text-sm">Total Applications</p>

            <h2 className="text-4xl font-bold text-white mt-3">
              {applications.length}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6">
            <p className="text-zinc-400 text-sm">Shortlisted</p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-3">
              {
                applications.filter(
                  (application) => application.status === "Shortlisted",
                ).length
              }
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6">
            <p className="text-zinc-400 text-sm">Selected</p>

            <h2 className="text-4xl font-bold text-emerald-400 mt-3">
              {
                applications.filter(
                  (application) => application.status === "Selected",
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid gap-8">
          {applications.map((application) => (
            <div
              key={application._id}
              className="
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              rounded-[32px]
              shadow-2xl
              p-8
              hover:bg-white/15
              hover:border-white/20
              transition-all duration-300
              "
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left Content */}
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {application.job.title}
                  </h2>

                  <p className="text-xl text-zinc-300 mt-3">
                    {application.job.company}
                  </p>

                  <p className="text-zinc-500 mt-2">
                    📍 {application.job.location}
                  </p>

                  <div className="mt-5">
                    <span className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                      ₹ {application.job.salary}
                    </span>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-start lg:items-end gap-4">
                  <span
                    className={`px-6 py-3 rounded-full text-sm font-semibold ${getStatusColor(
                      application.status,
                    )}`}
                  >
                    {application.status}
                  </span>

                  <p className="text-zinc-500 text-sm">
                    Applied on{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl p-12 text-center mt-10">
            <h2 className="text-3xl font-bold text-white">
              No Applications Yet
            </h2>

            <p className="text-zinc-400 mt-4 text-lg">
              Start applying to jobs and track your recruitment journey here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
