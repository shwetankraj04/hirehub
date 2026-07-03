import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CandidateDashboard from "./pages/CandidateDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import RecruiterLayout from "./layouts/RecruiterLayout";

import RecruiterOverview from "./pages/recruiter/RecruiterOverview";
import CreateJob from "./pages/recruiter/CreateJob";
import EditJob from "./pages/recruiter/EditJob";
import MyJobs from "./pages/recruiter/MyJobs";
import Applications from "./pages/recruiter/Applications";
import { RecruiterProvider } from "./context/RecruiterContext";

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/recruiter-dashboard") ||
    location.pathname.startsWith("/candidate-dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterProvider>
                <RecruiterLayout />
              </RecruiterProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<RecruiterOverview />} />

          <Route path="create-job" element={<CreateJob />} />

          <Route path="edit-job/:id" element={<EditJob />} />

          <Route path="my-jobs" element={<MyJobs />} />

          <Route path="applications" element={<Applications />} />
        </Route>

        {/* Candidate Route */}
        <Route
          path="/candidate-dashboard"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
