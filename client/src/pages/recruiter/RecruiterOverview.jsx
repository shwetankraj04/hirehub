import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecruiterContext } from "../../context/RecruiterContext";
import { Briefcase, Users, Star, Trophy } from "lucide-react";

const RecruiterOverview = () => {
  const navigate = useNavigate();

  const { jobs, applications } = useContext(RecruiterContext);

  const shortlistedCount = applications.filter(
    (app) => app.status === "Shortlisted",
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected",
  ).length;

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-10">
      {/* Welcome Section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-zinc-300 mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Recruiter Workspace
        </div>

        <h1 className="text-5xl font-bold text-white">Welcome Back 👋</h1>

        <p className="text-zinc-400 mt-4 text-lg max-w-2xl">
          Manage your hiring pipeline, track candidate applications, and
          discover top talent from one centralized dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
              <Briefcase size={28} className="text-purple-400" />
            </div>

            <div>
              <p className="text-zinc-400 text-sm">Total Jobs</p>

              <h2 className="text-4xl font-bold text-white mt-1">
                {jobs.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <Users size={28} className="text-blue-400" />
            </div>

            <div>
              <p className="text-zinc-400 text-sm">Applications</p>

              <h2 className="text-4xl font-bold text-white mt-1">
                {applications.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
              <Star size={28} className="text-yellow-400" />
            </div>

            <div>
              <p className="text-zinc-400 text-sm">Shortlisted</p>

              <h2 className="text-4xl font-bold text-yellow-400 mt-1">
                {shortlistedCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <Trophy size={28} className="text-emerald-400" />
            </div>

            <div>
              <p className="text-zinc-400 text-sm">Selected</p>

              <h2 className="text-4xl font-bold text-emerald-400 mt-1">
                {selectedCount}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div
          onClick={() => navigate("/recruiter-dashboard/create-job")}
          className="bg-white/10 border border-white/10 hover:border-white/20 hover:bg-white/15 rounded-3xl p-5 cursor-pointer transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Create Job</h3>

          <p className="text-zinc-400">
            Post a new opening and start receiving applications.
          </p>
        </div>

        <div
          onClick={() => navigate("/recruiter-dashboard/my-jobs")}
          className="bg-white/10 border border-white/10 hover:border-white/20 hover:bg-white/15 rounded-3xl p-5 cursor-pointer transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Manage Jobs</h3>

          <p className="text-zinc-400">
            Edit, update or remove active job postings.
          </p>
        </div>

        <div
          onClick={() => navigate("/recruiter-dashboard/applications")}
          className="bg-white/10 border border-white/10 hover:border-white/20 hover:bg-white/15 rounded-3xl p-5 cursor-pointer transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            Review Applications
          </h3>

          <p className="text-zinc-400">
            Track candidates and update recruitment status.
          </p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Recent Applications
        </h2>

        {recentApplications.length === 0 ? (
          <p className="text-zinc-400">No applications received yet.</p>
        ) : (
          <>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div
                  key={application._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-4"
                >
                  <div>
                    <h3 className="text-white font-semibold">
                      {application.candidate?.name || "Candidate"}
                    </h3>

                    <p className="text-zinc-400 text-sm">
                      {application.job?.title}
                    </p>
                  </div>

                  <span
                    className={`mt-3 md:mt-0 px-4 py-2 rounded-full text-sm font-medium w-fit ${
                      application.status === "Selected"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : application.status === "Shortlisted"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : application.status === "Rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate("/recruiter-dashboard/applications")}
                className="text-zinc-400 hover:text-white transition"
              >
                View All Applications →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecruiterOverview;
