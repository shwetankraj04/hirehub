const Job = require("../models/Job");
const Application = require("../models/Application");
const { application, response } = require("express");

const createJob = async (req, res) => {
  try {
    const { title, company, location, description, salary } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary,

      //logged in recruiter id
      recruiter: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 6;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchType = req.query.searchType || "title";

    // dynamic filter
    const filter = {
      [searchType]: {
        $regex: search,
        $options: "i",
      },
    };

    const totalJobs = await Job.countDocuments(filter);

    const jobs = await Job.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      jobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    //check if already applied
    const alreadApplied = await Application.findOne({
      candidate: req.user.id,
      job: jobId,
    });

    if (alreadApplied) {
      return res.status(400).json({
        message: "You already applied to this job",
      });
    }

    const { qualification, skills, experience } = req.body;

    // required field validation
    if (!qualification || !skills || !experience) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // resume validation
    if (!req.file) {
      return res.status(400).json({
        message: "Resume upload is required",
      });
    }

    const application = await Application.create({
      candidate: req.user.id,

      job: jobId,

      qualification: req.body.qualification,

      skills: req.body.skills,

      certifications: req.body.certifications,

      achievements: req.body.achievements,

      experience: req.body.experience,

      portfolioLink: req.body.portfolioLink,

      linkedinLink: req.body.linkedinLink,

      resume: req.file?.path,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getRecruiterApplications = async (req, res) => {
  try {
    //find recruiter jobs
    const recruiterJobs = await Job.find({
      recruiter: req.user.id,
    });

    //extract job ids
    const jobIds = recruiterJobs.map((job) => job._id);

    //fetch only relevant applications
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("candidate", "name email")
      .populate("job");

    res.status(200).json({
      applications,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application =
      await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    //check recruiter owns this job
    if (application.job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated",
      application,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getCandidateApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    })
      .populate("job")
      .populate("candidate", "name email");

    res.status(200).json({
      applications,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate("recruiter", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      job,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getRecuiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user.id,
    });

    res.status(200).json({
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    //ownership check
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this job",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    //ownership check
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this job",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.status(200).json({
      message: "Job updated successfully",
      updateJob,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const checkApplicationStatus = async (req, res) => {
  try {
    const existingApplication = await Application.findOne({
      candidate: req.user.id,

      job: req.params.jobId,
    });

    res.status(200).json({
      applied: !!existingApplication,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  applyToJob,
  getRecruiterApplications,
  updateApplicationStatus,
  getCandidateApplications,
  getSingleJob,
  getRecuiterJobs,
  deleteJob,
  updateJob,
  checkApplicationStatus,
};
