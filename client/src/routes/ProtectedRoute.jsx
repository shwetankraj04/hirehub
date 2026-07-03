import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  //not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  //role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <h1 className="p-8">Access Denied</h1>;
  }

  return children;
};

export default ProtectedRoute;
