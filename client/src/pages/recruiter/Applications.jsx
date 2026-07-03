import { useContext } from "react";

import API from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

import { RecruiterContext } from "../../context/RecruiterContext";

const Applications = () => {
  const { token } = useContext(AuthContext);

  const { applications, fetchApplications } = useContext(RecruiterContext);

  const updateStatus = async (applicationId, status) => {
    try {
      await API.patch(
        `/jobs/application-status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchApplications();

      alert("Status Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="p-10">
      {/* Heading */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-zinc-300 mb-5">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Recruiter Workspace
        </div>

        <h1 className="text-5xl font-bold text-white">Applications</h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Review candidates, evaluate applications, and manage recruitment
          decisions.
        </p>
      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-10">
          <h2 className="text-2xl font-bold text-white">
            No Applications Found
          </h2>

          <p className="text-zinc-400 mt-3">
            Applications will appear here once candidates start applying.
          </p>
        </div>
      ) : (
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
              "
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
                {/* Candidate Details */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white">
                    {application.job.title}
                  </h3>

                  <p className="text-zinc-300 mt-3 text-lg">
                    {application.job.company}
                  </p>

                  <div className="mt-6 space-y-4 text-zinc-400">
                    <p>
                      <span className="font-semibold text-white">
                        Candidate:
                      </span>{" "}
                      {application.candidate.name}
                    </p>

                    <p>
                      <span className="font-semibold text-white">Email:</span>{" "}
                      {application.candidate.email}
                    </p>

                    <p>
                      <span className="font-semibold text-white">
                        Qualification:
                      </span>{" "}
                      {application.qualification}
                    </p>

                    <p>
                      <span className="font-semibold text-white">Skills:</span>{" "}
                      {application.skills}
                    </p>

                    <p>
                      <span className="font-semibold text-white">
                        Experience:
                      </span>{" "}
                      {application.experience}
                    </p>

                    {application.certifications && (
                      <p>
                        <span className="font-semibold text-white">
                          Certifications:
                        </span>{" "}
                        {application.certifications}
                      </p>
                    )}

                    {application.achievements && (
                      <p>
                        <span className="font-semibold text-white">
                          Achievements:
                        </span>{" "}
                        {application.achievements}
                      </p>
                    )}

                    {application.portfolioLink && (
                      <p>
                        <span className="font-semibold text-white">
                          Portfolio:
                        </span>{" "}
                        <a
                          href={application.portfolioLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          View Portfolio
                        </a>
                      </p>
                    )}

                    {application.linkedinLink && (
                      <p>
                        <span className="font-semibold text-white">
                          LinkedIn:
                        </span>{" "}
                        <a
                          href={application.linkedinLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          View LinkedIn
                        </a>
                      </p>
                    )}

                    {application.resume && (
                      <a
                        href={application.resume.replace(
                          "/upload/",
                          "/upload/f_auto/",
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        inline-flex
                        mt-4
                        bg-white
                        text-black
                        px-5 py-3
                        rounded-2xl
                        font-semibold
                        hover:bg-zinc-200
                        transition-all duration-300
                        "
                      >
                        View Resume
                      </a>
                    )}
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex flex-col gap-4 min-w-[240px]">
                  <span
                    className={`px-5 py-3 rounded-full text-sm font-semibold w-fit ${getStatusColor(
                      application.status,
                    )}`}
                  >
                    {application.status}
                  </span>

                  <select
                    value={application.status}
                    onChange={(e) =>
                      updateStatus(application._id, e.target.value)
                    }
                    className="
                    bg-white/5
                    border border-white/10
                    text-white
                    p-4
                    rounded-2xl
                    outline-none
                    focus:border-white/20
                    "
                  >
                    <option value="Applied" className="bg-zinc-900">
                      Applied
                    </option>

                    <option value="Shortlisted" className="bg-zinc-900">
                      Shortlisted
                    </option>

                    <option value="Rejected" className="bg-zinc-900">
                      Rejected
                    </option>

                    <option value="Selected" className="bg-zinc-900">
                      Selected
                    </option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
