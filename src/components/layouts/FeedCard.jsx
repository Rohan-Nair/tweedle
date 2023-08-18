import { AiOutlineHeart } from "react-icons/ai";
import {
  BsFillBookmarkHeartFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { auth, db } from "../../firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeedCard = ({ username, tweedle, likes, tags, thisPostid }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  // const likeHandler = async () => {
  //   try {
  //     const postsRef = collection(db, "posts");
  //     const snapshot = await getDocs(postsRef);
  //     snapshot.forEach(async (eachPost) => {
  //       if (eachPost.id === thisPostid) {
  //         await updateDoc(doc(db, "posts", eachPost.id), {
  //           likes: likes + 1,
  //         });
  //         console.log(likes);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const saveHandler = async () => {
    if (auth.currentUser) {
      navigate("/login");
      try {
        await setDoc(
          doc(
            db,
            `mySavedPosts${auth.currentUser?.uid}`,
            `tweedle${thisPostid}`
          ),
          { id: thisPostid }
        );
        setIsSaved(true);
        toast("Saved", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  };

  const unSaveHandler = async () => {
    if (auth.currentUser) {
      try {
        await deleteDoc(
          doc(
            db,
            `mySavedPosts${auth.currentUser?.uid}`,
            `tweedle${thisPostid}`
          )
        );
        toast("Removed", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
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
      {/* dont feel like adding likes now */}
      {/* <div
        className="flex items-center justify-center w-fit gap-1 text-2xl"
        onClick={likeHandler}
        >
        <AiOutlineHeart />
        <p>{likes}</p>
      </div> */}

      <div className="flex items-center justify-center w-fit gap-1 text-2xl mb-1">
        {isSaved ? (
          <BsFillBookmarkCheckFill onClick={unSaveHandler} />
        ) : (
          <BsFillBookmarkHeartFill onClick={saveHandler} />
        )}
      </div>
    </div>
  );
};

export default FeedCard;
