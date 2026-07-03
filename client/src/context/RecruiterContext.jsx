import { createContext, useContext, useEffect, useState } from "react";

import API from "../services/api";

import { AuthContext } from "./AuthContext";

export const RecruiterContext = createContext();

export const RecruiterProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);

  const [applications, setApplications] = useState([]);

  const fetchRecruiterJobs = async () => {
    try {
      const response = await API.get("/jobs/recruiter-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await API.get("/jobs/applications", {
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
    if (token) {
      fetchRecruiterJobs();
      fetchApplications();
    }
  }, [token]);

  return (
    <RecruiterContext.Provider
      value={{
        jobs,
        setJobs,
        applications,
        setApplications,
        fetchRecruiterJobs,
        fetchApplications,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
};
