const express = require("express");

const {
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
} = require("../controllers/jobController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

//candidate get all jobs
router.get("/", getAllJobs);

//recruiter creates job
router.post("/create", protect, authorizeRoles("recruiter"), createJob);

//candidates applies to job
router.post(
  "/apply/:jobId",
  protect,
  authorizeRoles("candidate"),
  upload.single("resume"),
  applyToJob,
);

//recruiter get applied applications
router.get(
  "/applications",
  protect,
  authorizeRoles("recruiter"),
  getRecruiterApplications,
);

//recruiter can change the application status
router.patch(
  "/application-status/:applicationId",
  protect,
  authorizeRoles("recruiter"),
  updateApplicationStatus,
);

//candidates check their applied applications
router.get(
  "/my-applications",
  protect,
  authorizeRoles("candidate"),
  getCandidateApplications,
);

//get recruiter own job list
router.get(
  "/recruiter-jobs",
  protect,
  authorizeRoles("recruiter"),
  getRecuiterJobs,
);

//recruiter can delete their job listing
router.delete("/:id", protect, authorizeRoles("recruiter"), deleteJob);

//recruiter can edit their job listing
router.put("/:id", protect, authorizeRoles("recruiter"), updateJob);

//check status of the application
router.get(
  "/check-application/:jobId",
  protect,
  authorizeRoles("candidate"),
  checkApplicationStatus,
);

//get selected job details
router.get("/:id", getSingleJob);

module.exports = router;
