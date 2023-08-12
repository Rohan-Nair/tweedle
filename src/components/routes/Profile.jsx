import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userdeets, setUserdeets] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUserdeets(user);
        console.log(userdeets);
      }
    });
  }, [userdeets]);
  return <div>Profile</div>;
};

export default Profile;
