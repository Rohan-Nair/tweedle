import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import userDefault from "../../assets/svgs/user.svg";

const NewPost = () => {
  const [post, setPost] = useState({
    name: "",
    imgUrl: "",
    tweedle: "",
    likes: 0,
    tags: [],
  });
  return (
    <div className="px-5 py-2 border w-full h-full">
      <h2 className="text-4xl mb-5">New Post</h2>
      <div className="flex items-center justify-start gap-3">
        <img
          src={
            auth.currentUser?.photoURL ? auth.currentUser.photoURL : userDefault
          }
          className="bg-zinc-800 p-4 mb-2 rounded-full "
        />
        <p className="text-white text-lg">
          {auth.currentUser.displayName
            ? auth.currentUser.displayName
            : "@idonthaveaname"}
        </p>
      </div>
      <form>
        <textarea
          className="bg-zinc-800 outline-none rounded-md px-2 py-1 mb-2 w-full h-32 placeholder:text-white placeholder:text-md"
          type="text"
          placeholder="Whats on your mind?"
        />
        <textarea
          className="bg-zinc-800 outline-none rounded-md px-2 py-1 w-full h-10 placeholder:text-white placeholder:text-md"
          type="text"
          placeholder="#Tags Here"
        />
        <button className="bg-white text-black rounded-md px-10 py-2 mt-2 text-lg mx-auto">
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
