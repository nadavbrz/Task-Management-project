import React, { useEffect } from 'react';
import classes from '../style/pages/AdminPanel.module.css';
import { fetchAllUsers } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteUserButton from '../components/DeleteUserButton';
import { Helmet } from "react-helmet-async";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={classes.pageContainer}>
         <Helmet>
        <title>Admin panel</title>
      </Helmet>
      <div className={classes.pageHeader}>
        <h1>Admin Panel</h1>
      </div>
      <div className={classes.pageContent}>
        <h2>Users:</h2>
        <ul className={classes.usersList}>
          {users &&
            users.map((user) => (
              <li key={user._id} className={classes.user}>
                <b>username:</b > {user.username}
                <br />
                 <b>username:</b> {user.email}
                <br />
                <b>id:</b> {user._id}
                <br />
                <b>image:</b> {user.image}
                <DeleteUserButton userId={user._id} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
