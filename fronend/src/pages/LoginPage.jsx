import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { loginUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import classes from "../style/pages/LoginRegister.module.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    dispatch(loginUser({ email, password }))
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

  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <div className={classes.container}>
        <div className="login/register-box">
        {formErrors.auth && <p className={classes.error}>{formErrors.auth}</p>}

          <h1>Login</h1>
          {formErrors.general && <p className={classes.error}>{formErrors.general}</p>}
          <form onSubmit={handleSubmit}>
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
             <button type="submit" disabled={loading}>log in</button>
             <button onClick={goToRegister} className={classes.second_btn}>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
