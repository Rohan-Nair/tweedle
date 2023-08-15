import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

const Feed = () => {
  const [postList, setPostList] = useState([]);

  const gettingPosts = async () => {
    const postsRef = collection(db, "posts");
    try {
      const postListFetching = [];
      const snapshot = await getDocs(postsRef);
      snapshot.forEach((eachPost) => {
        postListFetching.push({
          ...eachPost.data(),
          id: eachPost.id,
        });
      });
      setPostList(postListFetching);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const run = async () => {
      await gettingPosts();
    };
    run().catch((err) => console.log(err));
  }, []);
  return (
    <div>
      Feed
      {postList.map((eachPost) => (
        <p key={eachPost.id}>{eachPost.tweedle}</p>
      ))}
    </div>
  );
};

export default Feed;
