import { useState, useEffect, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import API from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

import { RecruiterContext } from "../../context/RecruiterContext";

const EditJob = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const { fetchRecruiterJobs } = useContext(RecruiterContext);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const fetchJob = async () => {
    try {
      const response = await API.get(`/jobs/${id}`);

      const job = response.data.job;

      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        salary: job.salary,
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/jobs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchRecruiterJobs();

      alert("Job Updated Successfully");

      navigate("/recruiter-dashboard/my-jobs");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Failed To Update Job");
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-white text-2xl">Loading Job...</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      {/* Heading */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-zinc-300 mb-5">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          Edit Job
        </div>

        <h1 className="text-5xl font-bold text-white">Update Job Posting</h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Modify job details and keep your hiring requirements up to date.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl p-8 md:p-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
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
            name="company"
            placeholder="Company Name"
            value={formData.company}
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
            name="location"
            placeholder="Location"
            value={formData.location}
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
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
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
            name="description"
            placeholder="Job Description"
            value={formData.description}
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
            h-40
            "
          />

          <button
            className="
            bg-white
            text-black
            py-4
            rounded-2xl
            font-semibold
            hover:bg-zinc-200
            transition-all duration-300
            shadow-xl shadow-white/10
            md:col-span-2
            "
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
