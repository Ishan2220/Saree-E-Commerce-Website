import { Navigate } from "react-router-dom";

const USER_KEY = "kangan_user";

const ProtectedRoute = ({ children }) => {
  const savedUser = localStorage.getItem(USER_KEY);

  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(savedUser);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
