import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("title");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    try {
      const response = await API.get(
        `/jobs?page=${currentPage}&search=${search}&searchType=${searchType}`,
      );

      setJobs(response.data.jobs);

      setCurrentPage(response.data.currentPage);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, search, searchType]);

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
              Discover Premium Opportunities
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1]">
            Explore Jobs
          </h1>

          {/* Description */}
          <p className="text-zinc-400 mt-6 text-xl max-w-2xl leading-8">
            Discover opportunities from top companies and recruiters around the
            world.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl p-5 mb-14">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex-1 w-full">
              <span className="text-2xl mr-3 text-zinc-400">🔍</span>

              <input
                type="text"
                placeholder={`Search by ${searchType}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                w-full
                bg-transparent
                outline-none
                text-white
                placeholder:text-zinc-500
                text-lg
                "
              />
            </div>

            {/* Dropdown */}
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="
              bg-white/5
              border border-white/10
              text-white
              rounded-2xl
              px-5 py-4
              lg:w-64
              outline-none
              "
            >
              <option value="title" className="bg-zinc-900 text-white">
                Job Title
              </option>

              <option value="company" className="bg-zinc-900 text-white">
                Company
              </option>

              <option value="location" className="bg-zinc-900 text-white">
                Location
              </option>
            </select>

            {/* Search Button */}
            {/* <button
              className="
              bg-white
              text-black
              px-8 py-4
              rounded-2xl
              font-semibold
              hover:bg-zinc-200
              transition-all duration-300
              shadow-xl shadow-white/10
              w-full lg:w-auto
              "
            >
              Search
            </button> */}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              rounded-[28px]
              p-7
              hover:bg-white/15
              hover:border-white/20
              hover:-translate-y-1
              transition-all duration-300
              flex flex-col justify-between
              "
            >
              <div>
                {/* Top Tags */}
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
                    Active Hiring
                  </div>

                  <div className="text-zinc-500 text-sm">Full Time</div>
                </div>

                {/* Job Title */}
                <h2 className="text-2xl font-bold text-white leading-snug">
                  {job.title}
                </h2>

                {/* Company */}
                <p className="text-zinc-300 mt-4 text-lg">{job.company}</p>

                {/* Location */}
                <p className="text-zinc-500 mt-2">📍 {job.location}</p>

                {/* Salary */}
                <div className="mt-5">
                  <span className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                    ₹ {job.salary}
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-400 mt-6 leading-7 line-clamp-3">
                  {job.description}
                </p>
              </div>

              {/* Button */}
              <Link
                to={`/jobs/${job._id}`}
                className="
                mt-8
                inline-flex
                justify-center
                items-center
                bg-white
                text-black
                py-3.5
                rounded-2xl
                font-semibold
                hover:bg-zinc-200
                transition-all duration-300
                "
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="
            bg-white/10
            border border-white/10
            text-white
            px-6 py-3
            rounded-2xl
            disabled:opacity-40
            hover:bg-white/15
            transition-all duration-300
            "
          >
            Previous
          </button>

          <span className="text-zinc-300 text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="
            bg-white
            text-black
            px-6 py-3
            rounded-2xl
            font-semibold
            disabled:opacity-40
            hover:bg-zinc-200
            transition-all duration-300
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
