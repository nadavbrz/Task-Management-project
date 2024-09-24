import React, { useEffect, useState } from "react";
import classes from "../style/pages/ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  logoutUser,
  updateUser,
  deleteUser,
} from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { API_BASE_URL } from "../config";
import { validatePassword ,validateEmail,validateUsername} from "../utils/validation";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [stateUser, setStateUser] = useState(user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setStateUser(user);
      if (user.image) {
        setImagePreview(getImageURL(user.image));
      }
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const getImageURL = (path) => {
    return path && !path.startsWith("http") ? `${API_BASE_URL}${path}` : path;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setChangesMade(true);
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword(stateUser.password || "")) {
      setValidationMessage(validatePassword(stateUser.password || ""));
      return;
    } else {
      setValidationMessage("");
    }

    if (validateEmail(stateUser.email || "")) {
      setValidationMessage(validateEmail(stateUser.email || ""));
      return;
    } else {
      setValidationMessage("");
    }

    if (validateUsername(stateUser.username || "")) {
      setValidationMessage(validateUsername(stateUser.username || ""));
      return;
    } else {
      setValidationMessage("");
    }


    const formData = new FormData();
    formData.append("username", stateUser.username);
    formData.append("email", stateUser.email);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    if (stateUser.password) {
      formData.append("password", stateUser.password);
    }

    if (changesMade) {
      dispatch(updateUser(formData))
        .unwrap()
        .then(() => {
          setSuccessMessage("User updated successfully");
          setChangesMade(false);
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Failed to update user:", error);
        });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setChangesMade(true);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const logOut = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const deleteImage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile/image`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setImagePreview(null);
        await dispatch(getUser());
        setSuccessMessage("Image deleted successfully");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.log("Failed to delete image:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const deleteAccount = () => {
    dispatch(deleteUser(user._id))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Failed to delete account:", error);
      });
  };

  return (
    <div className={classes.pageContainer}>
      <Helmet>
        <title>Account Page</title>
      </Helmet>
      <div className={classes.innerContainer}>
        <button className={classes.deleteAccountBtn} onClick={deleteAccount}>
          Delete Account
        </button>
        <h2>Account Profile</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {successMessage && (
          <p className={classes.successMessage}>{successMessage}</p>
        )}
        <div className={classes.profileSection}>
          {selectedImage && (
            <div className={classes.deleteBtnBox}>
              <button className={classes.deleteBtn} onClick={deleteImage}>
                Delete Image
              </button>
            </div>
          )}
          <div
            className={classes.profilePictureContainer}
            onClick={handleImageClick}
          >
            <img
              src={
                imagePreview ||
                getImageURL(user?.image) ||
                "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
              }
              alt="Profile"
              className={classes.profilePicture}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg";
              }}
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={stateUser?.username || ""}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={stateUser?.email || ""}
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={stateUser?.password || ""}
              onChange={handleChange}
            />
            {validationMessage && <p className={classes.errorMessage}>{validationMessage}</p>}

            <button type="submit" className={classes.saveBtn}>
              Save Changes
            </button>
            <button
              type="button"
              className={classes.logoutBtn}
              onClick={logOut}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
