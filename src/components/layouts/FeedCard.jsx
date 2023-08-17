import React, { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard = ({ username, tweedle, likes, tags }) => {
  return (
    <div className="bg-zinc-900 border rounded-md px-2 py-2 my-2">
      <p className="text-2xl">@{username}</p>
      <textarea
        className="bg-black px-1 my-2 rounded-md w-full text-xl"
        value={tweedle}
        disabled
      ></textarea>
      {tags !== "" && (
        <>
          <h6 className="text-2xl">Tags</h6>
          <textarea
            className="bg-black my-2 rounded-md w-full text-xl"
            value={tags}
            disabled
          ></textarea>
        </>
      )}
      <div className="flex items-center justify-center w-fit gap-1">
        <AiOutlineHeart />
        <p>{likes}</p>
      </div>
    </div>
  );
};

export default FeedCard;
