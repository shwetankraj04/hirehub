import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

import { RecruiterContext } from "../../context/RecruiterContext";

const MyJobs = () => {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const { jobs, fetchRecruiterJobs } = useContext(RecruiterContext);

  const handleDeleteJob = async (jobId) => {
    try {
      await API.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Deleted Successfully");

      fetchRecruiterJobs();
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed To Delete Job");
    }
  };

  return (
    <div className="p-10">
      {/* Heading */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-zinc-300 mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Recruiter Workspace
        </div>

        <h1 className="text-5xl font-bold text-white">My Jobs</h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Manage active openings, update job details, and monitor hiring
          positions.
        </p>
      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-10">
          <h2 className="text-2xl font-bold text-white">No Jobs Found</h2>

          <p className="text-zinc-400 mt-3">
            Create your first job posting to start receiving applications.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              rounded-[28px]
              p-8
              flex flex-col
              hover:bg-white/15
              hover:border-white/20
              hover:-translate-y-1
              transition-all duration-300
              "
            >
              {/* Status */}
              <div className="flex items-center justify-between mb-5">
                <div className="bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
                  Active
                </div>

                <span className="text-zinc-500 text-sm">Hiring</span>
              </div>

              {/* Job Info */}
              <h3 className="text-2xl font-bold text-white">{job.title}</h3>

              <p className="text-zinc-300 mt-3">{job.company}</p>

              <p className="text-zinc-500 mt-2">📍 {job.location}</p>

              <div className="mt-5">
                <span className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                  ₹ {job.salary}
                </span>
              </div>

              <p className="text-zinc-400 mt-5 line-clamp-3 leading-7">
                {job.description}
              </p>

              {/* Actions */}
              <div className="mt-auto flex gap-3 pt-8">
                <button
                  onClick={() =>
                    navigate(`/recruiter-dashboard/edit-job/${job._id}`)
                  }
                  className="
                  flex-1
                  bg-white
                  text-black
                  py-3
                  rounded-2xl
                  font-semibold
                  hover:bg-zinc-200
                  transition-all duration-300
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="
                  flex-1
                  bg-red-500/20
                  border border-red-500/20
                  text-red-400
                  py-3
                  rounded-2xl
                  font-semibold
                  hover:bg-red-500/30
                  transition-all duration-300
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
