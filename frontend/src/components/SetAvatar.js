import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/SetAvatar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const profilePictures = [
    "https://api.multiavatar.com/Binx Bond.png",
    "https://api.multiavatar.com/Binx Bond.png",
    "https://api.multiavatar.com/Binx Bond.png",
    "https://api.multiavatar.com/Binx Bond.png",
  ];

  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    try {
      // Send a POST request to the backend API to save the selected avatar URL
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: selectedAvatar,
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = selectedAvatar;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    } catch (error) {
      console.error("Error setting avatar:", error);
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      <div className="div-container">
        <div className="title-container">
          <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {profilePictures.map((picture, index) => (
            <div
              className={`avatar ${
                selectedAvatar === picture ? "selected" : ""
              }`}
              key={index}
              onClick={() => setSelectedAvatar(picture)}
            >
              <img
                src={picture}
                alt={`Avatar ${index}`}
                className="avatar-img"
              />
            </div>
          ))}
        </div>
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
      </div>
      <ToastContainer />
    </>
  );
}
