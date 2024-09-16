import React from "react";
import classes from "../style/pages/AboutPage.module.css";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <div className={classes.aboutContainer}>
         <Helmet>
        <title>About page</title>
      </Helmet>
      <h1 className={classes.aboutTitle}>About Task Master</h1>
      <p className={classes.aboutIntro}>
        Welcome to <strong>Task Master</strong> – your ultimate tool for task management and productivity.
      </p>
      
      <section className={classes.aboutSection}>
        <h2>Our Mission</h2>
        <p>
          At Task Master, we aim to provide an intuitive, streamlined, and efficient platform that helps individuals and teams stay on top of their daily tasks, projects, and goals. Our mission is to help you become more productive, organized, and focused.
        </p>
      </section>
      
      <section className={classes.aboutSection}>
        <h2>What We Offer</h2>
        <ul className={classes.featuresList}>
          <li><strong>Easy Task Management:</strong> Create, manage, and track your tasks with ease.</li>
          <li><strong>Customizable Workflows:</strong> Adapt the platform to suit your specific needs and preferences.</li>
          <li><strong>Real-time Collaboration:</strong> Collaborate with team members in real-time, assigning tasks and sharing progress.</li>
          <li><strong>Deadline Reminders:</strong> Stay on top of your deadlines with reminders and notifications.</li>
          <li><strong>Progress Tracking:</strong> Monitor your productivity and analyze your task completion.</li>
        </ul>
      </section>

      <section className={classes.aboutSection}>
        <h2>Why Choose Task Master?</h2>
        <p>
          Whether you're managing personal to-dos or leading a team project, Task Master is built to adapt to your workflow. With its user-friendly interface and powerful features, you'll find it easy to keep everything organized and within reach.
        </p>
        <p>
          Our platform is designed for anyone who wants to make the most of their time and efforts – from individuals to businesses, from freelancers to teams.
        </p>
      </section>

      <section className={classes.aboutSection}>
        <h2>Get Started</h2>
        <p>
          Start using <strong>Task Master</strong> today and take control of your tasks, deadlines, and projects. Let us help you reach new levels of productivity and efficiency.
        </p>
      </section>


    </div>
  );
};

export default AboutPage;
