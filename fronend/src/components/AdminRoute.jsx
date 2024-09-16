import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
// import classes from"../style/components/ProtectedRoute.module.css"
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.email !== "nadav@gmail.com") {
      navigate("/profile");
    }
  }, [user, navigate]);
  return (
    <>{user.email && user.email === "nadav@gmail.com" ? <main>{children}</main> : null}</>
  );
};

export default AdminRoute;
