import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();

  const { user, token } = useContext(AuthContext);

  const [job, setJob] = useState(null);

  const [showApplyModal, setShowApplyModal] = useState(false);

  const [hasApplied, setHasApplied] = useState(false);

  const [applicationData, setApplicationData] = useState({
    qualification: "",
    skills: "",
    certifications: "",
    achievements: "",
    experience: "",
    portfolioLink: "",
    linkedinLink: "",
    resume: null,
  });

  const checkApplicationStatus = async () => {
    try {
      const response = await API.get(`/jobs/check-application/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHasApplied(response.data.applied);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJob = async () => {
    try {
      const response = await API.get(`/jobs/${id}`);

      setJob(response.data.job);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJob();

    if (user?.role === "candidate") {
      checkApplicationStatus();
    }
  }, []);

  const handleChange = (e) => {
    // File Input
    if (e.target.name === "resume") {
      setApplicationData({
        ...applicationData,
        resume: e.target.files[0],
      });
    }

    // Normal Inputs
    else {
      setApplicationData({
        ...applicationData,

        [e.target.name]: e.target.value,
      });
    }
  };

  const handleApply = async () => {
    try {
      const formData = new FormData();

      formData.append("qualification", applicationData.qualification);

      formData.append("skills", applicationData.skills);

      formData.append("certifications", applicationData.certifications);

      formData.append("achievements", applicationData.achievements);

      formData.append("experience", applicationData.experience);

      formData.append("portfolioLink", applicationData.portfolioLink);

      formData.append("linkedinLink", applicationData.linkedinLink);

      formData.append("resume", applicationData.resume);

      const response = await API.post(`/jobs/apply/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);

      setHasApplied(true);

      setShowApplyModal(false);

      // Reset Form
      setApplicationData({
        qualification: "",
        skills: "",
        certifications: "",
        achievements: "",
        experience: "",
        portfolioLink: "",
        linkedinLink: "",
        resume: null,
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Application Failed");
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 border-b border-white/10 pb-8">
            <div>
              {/* Job Title */}
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1]">
                {job.title}
              </h1>

              {/* Company */}
              <p className="text-2xl text-zinc-300 mt-5">{job.company}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-4 mt-6">
                <span className="bg-white/10 border border-white/10 text-zinc-300 px-4 py-2 rounded-full">
                  📍 {job.location}
                </span>

                <span className="bg-white/10 border border-white/10 text-zinc-300 px-4 py-2 rounded-full">
                  ₹ {job.salary}
                </span>
              </div>
            </div>

            {/* Apply Button */}
            {user?.role === "candidate" && (
              <button
                onClick={() => !hasApplied && setShowApplyModal(true)}
                disabled={hasApplied}
                className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 h-fit ${
                  hasApplied
                    ? "bg-white/10 border border-white/10 text-zinc-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/10"
                }`}
              >
                {hasApplied ? "Applied" : "Apply Now"}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Job Description
            </h2>

            <p className="text-zinc-400 leading-8 text-lg">{job.description}</p>
          </div>

          {/* Recruiter Info */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-[28px] p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Recruiter Information
            </h2>

            <div className="space-y-3 text-lg text-zinc-300">
              <p>
                <span className="font-semibold text-white">Name:</span>{" "}
                {job.recruiter.name}
              </p>

              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                {job.recruiter.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div
            className="
            bg-zinc-950/95
            backdrop-blur-2xl
            border border-white/10
            rounded-[32px]
            w-full
            max-w-4xl
            max-h-[90vh]
            overflow-y-auto scrollbar-hide
            p-8 md:p-10
            relative
            shadow-2xl
            "
          >
            {/* Close Button */}
            <button
              onClick={() => setShowApplyModal(false)}
              className="
              absolute
              top-5
              right-5
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-full
              bg-white/10
              border border-white/10
              text-zinc-400
              hover:bg-white/20
              hover:text-white
              transition-all duration-300
              "
            >
              ×
            </button>

            {/* Heading */}
            <h2 className="text-4xl font-bold text-white mb-3">
              Job Application
            </h2>

            <p className="text-zinc-400 mb-8 text-lg">
              Complete your application details to apply for this opportunity.
            </p>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                required
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={applicationData.qualification}
                onChange={handleChange}
                className="
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                p-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
              />

              <input
                required
                type="text"
                name="skills"
                placeholder="Skills"
                value={applicationData.skills}
                onChange={handleChange}
                className="
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                p-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
              />

              <input
                type="text"
                name="certifications"
                placeholder="Certifications"
                value={applicationData.certifications}
                onChange={handleChange}
                className="
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                p-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
              />

              <input
                required
                type="text"
                name="experience"
                placeholder="Experience"
                value={applicationData.experience}
                onChange={handleChange}
                className="
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                p-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
              />

              <input
                type="text"
                name="portfolioLink"
                placeholder="Portfolio Link"
                value={applicationData.portfolioLink}
                onChange={handleChange}
                className="
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                p-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
              />

              <input
                type="text"
                name="linkedinLink"
                placeholder="LinkedIn Link"
                value={applicationData.linkedinLink}
                onChange={handleChange}
                className="
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                p-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                "
              />

              <textarea
                name="achievements"
                placeholder="Achievements"
                value={applicationData.achievements}
                onChange={handleChange}
                className="
                bg-white/5
                border border-white/10
                text-white
                placeholder:text-zinc-500
                p-4
                rounded-2xl
                outline-none
                focus:border-white/20
                focus:bg-white/10
                transition-all duration-300
                md:col-span-2
                h-32
                "
              />

              {/* Resume Upload */}
              <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[28px] p-6">
                <label className="block mb-3 font-semibold text-white text-lg">
                  Upload Resume (PDF only)
                </label>

                <input
                  required
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={handleChange}
                  className="
                  w-full
                  bg-white/5
                  border border-white/10
                  text-zinc-400
                  p-4
                  rounded-2xl
                  "
                />

                <p className="text-sm text-zinc-500 mt-3">
                  Maximum file size: 2 MB
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleApply}
                className="
                bg-white
                text-black
                py-4
                rounded-2xl
                font-semibold
                text-lg
                hover:bg-zinc-200
                transition-all duration-300
                shadow-xl shadow-white/10
                md:col-span-2
                "
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
