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
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeedCard = ({
  username,
  tweedle,
  likes,
  tags,
  thisPostid,
  deleteIcon,
}) => {
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

  const deletePost = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      try {
        await deleteDoc(doc(db, `posts`, thisPostid));
        toast("Deleted", {
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

  const saveHandler = async () => {
    if (auth.currentUser) {
      try {
        await setDoc(
          doc(db, `mySavedPosts${auth.currentUser?.uid}`, `${thisPostid}`),
          {
            id: thisPostid,
            likes: likes,
            name: username,
            tweedle: tweedle,
            tags: tags,
          }
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
          doc(db, `mySavedPosts${auth.currentUser?.uid}`, `${thisPostid}`)
        );
        toast("Removed", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setIsSaved(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const checkingLikedOnLoading = async () => {
    try {
      const snap = await getDoc(
        doc(db, `mySavedPosts${auth.currentUser?.uid}`, `${thisPostid}`)
      );
      if (snap.exists()) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const run = async () => {
      await checkingLikedOnLoading();
    };
    run().catch((err) => console.log(err));
  }, []);
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
            className="bg-black px-1 my-2 rounded-md w-full text-xl"
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
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-fit gap-1 text-2xl mb-1">
          {isSaved ? (
            <BsFillBookmarkCheckFill onClick={unSaveHandler} />
          ) : (
            <BsFillBookmarkHeartFill onClick={saveHandler} />
          )}
        </div>

        {deleteIcon && (
          <button
            className="bg-white text-black rounded-md px-3 py-1 text-lg"
            onClick={deletePost}
          >
            Delete Post
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
