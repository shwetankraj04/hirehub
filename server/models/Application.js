const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected", "Selected"],
      default: "Applied",
    },

    qualification: {
      type: String,
    },

    skills: {
      type: String,
    },

    certifications: {
      type: String,
    },

    achievements: {
      type: String,
    },

    experience: {
      type: String,
    },

    portfolioLink: {
      type: String,
    },

    linkedinLink: {
      type: String,
    },

    resume: {
      type: String,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
