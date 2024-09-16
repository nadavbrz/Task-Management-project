import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { registerUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import classes from "../style/pages/LoginRegister.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    dispatch(registerUser({ username, email, password }))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((err) => {
        if(err.errors){
            setFormErrors(err.errors);
        }
        else {
            setFormErrors({ general: err.message });
          }
      });
  };

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className={classes.container}>
        <div className="login/register-box">
          <h1>Register</h1>
          {formErrors.general && <p className={classes.error}>{formErrors.general}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              required
              id="username"
              placeholder="your username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />{" "}
            {formErrors.username && <p className={classes.error}>{formErrors.username}</p>}
            <br />
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              name="email"
              required
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {formErrors.email && <p className={classes.error}>{formErrors.email}</p>}
            <br />
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="password"
              required
              id="password"
              placeholder="*****"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {formErrors.password && <p className={classes.error}>{formErrors.password}</p>}
              <button type="submit" disabled={loading}>Register</button>
              <button onClick={goToLogin} className={classes.second_btn}>Log in</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
