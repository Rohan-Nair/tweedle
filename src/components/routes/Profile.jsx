import { onAuthStateChanged, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import FeedCard from "../layouts/FeedCard";

const Profile = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [myPosts, setMyPosts] = useState([]);

  const usernameChangeHandler = async () => {
    await updateProfile(auth?.currentUser, {
      displayName: Username,
    });
    toast("Profile Updated", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const gettingPosts = async () => {
    const postsRef = collection(db, "posts");
    try {
      const myPostListFetching = [];
      const snapshot = await getDocs(postsRef);
      snapshot.forEach((eachPost) => {
        if (eachPost.id.startsWith(auth.currentUser?.uid)) {
          myPostListFetching.push({
            ...eachPost.data(),
            id: eachPost.id,
          });
        }
      });
      setMyPosts(myPostListFetching);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUsername(user.displayName);
        const run = async () => {
          await gettingPosts();
        };
        run().catch((err) => console.log(err));
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-5 border mb-10 md:mb-0 w-full h-[46rem] overflow-scroll">
      <div className="bg-black rounded-sm w-full sticky -top-0">
        <h2 className="text-4xl ">Profile</h2>
        <input
          type="text"
          placeholder="Username"
          className="bg-zinc-800 outline-none rounded-md px-2 py-1 mt-3 w-full h-10 placeholder:text-white placeholder:text-md"
          onChange={(e) => setUsername(e.target.value)}
          value={Username}
        />
        <button
          className="bg-white text-black rounded-md px-3 py-2 mt-2 text-lg mx-auto"
          onClick={usernameChangeHandler}
        >
          Update Username
        </button>
        <hr className="mt-3" />
      </div>
      <div>
        {myPosts.map((eachPost) => (
          <FeedCard
            key={eachPost.id}
            username={eachPost.name}
            tweedle={eachPost.tweedle}
            tags={eachPost.tags}
            likes={eachPost.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
