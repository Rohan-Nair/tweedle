import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard = ({ username, tweedle, likes, tags }) => {
  return (
    <div className="bg-zinc-900 rounded-md px-2 py-2 my-2">
      <p>@{username}</p>
      <textarea
        className="bg-black px-1 my-2 rounded-md w-full"
        value={tweedle}
        disabled
      ></textarea>
      <textarea
        className="bg-black my-2 rounded-md w-full"
        value={tags}
        disabled
      ></textarea>
      <div className="flex items-center justify-center w-fit gap-1">
        <AiOutlineHeart />
        <p>{likes}</p>
      </div>
    </div>
  );
};

export default FeedCard;
