import React, { useState, useEffect } from "react";
import classes from "../style/pages/ContactPage.module.css";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
        name: user.username,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/send-email`, {
        recipient: formData.email,
        name: formData.name,
        text: formData.message,
      });

      if (response.data) {
        setStatusMessage("Message sent successfully");
      }
    } catch (error) {
      console.error("Error sending the email:", error);
      setStatusMessage("Error sending the email");
    }

    setFormData({ name: "", email: formData.email, message: "" });
  };

  return (
    <div className={classes.contactContainer}>
      <Helmet>
        <title>Contact Page</title>
      </Helmet>
      <h1 className={classes.contactTitle}>Contact Us</h1>
      {statusMessage && (
        <p className={classes.statusMessage}>{statusMessage}</p>
      )}
      <form className={classes.contactForm} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            readOnly
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            readOnly
            onChange={handleChange}
            required
            placeholder="Your Email"
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            rows="5"
          />
        </div>
        <button type="submit" className={classes.submitButton}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
