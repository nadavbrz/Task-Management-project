import React, { useEffect } from "react";

const Logout = () => {

  useEffect(() => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
