import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sidebarLinks from "../../../constants/leftsideBarlinks";
import logo from "../../assets/images/logo.png";
import { AppContext } from "../../context/AppContext";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";

const LeftAside = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { visible, setVisible, buttonText, setButtonText } =
    useContext(AppContext);
  // const [buttonText, setButtonText] = useState(false);
  const sidebarLinks2 = [
    {
      imgURL: "../../../src/assets/svgs/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "../../../src/assets/svgs/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "../../../src/assets/svgs/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "../../../src/assets/svgs/create.svg",
      route: "/new-post",
      label: "New Post",
    },
    {
      imgURL: "../../../src/assets/svgs/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast("Logged out", {
        icon: "😿",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const navtoLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setButtonText(true);
        } else {
          setButtonText(false);
        }
      });
    } catch (err) {
      console.log(err.code);
    }

    if (location.pathname === "/login" || location.pathname === "/signup") {
      setVisible(false);
    }
  }, [visible]);
  return (
    visible && (
      <div>
        <section className=" sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-start gap-3 overflow-auto border-r px-10 pb-5 pt-28 max-md:hidden">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-12 ml-5 " />
            <h2 className="text-3xl">Tweedle</h2>
          </div>
          <div className="px-3 text-xl">
            {sidebarLinks.map((link) => {
              return (
                <div
                  onClick={() => {
                    navigate(link.route);
                  }}
                  key={link.label}
                  className="flex p-4 cursor-pointer rounded-full w-40 items-center gap-3 hover:bg-zinc-800 "
                >
                  <img src={link.imgURL} />
                  <p className="max-md:hidden">{link.label}</p>
                </div>
              );
            })}
            <button
              onClick={buttonText ? logoutHandler : navtoLogin}
              className="p-3 mt-10 w-full bg-white text-black rounded-full"
            >
              {buttonText === false ? "Login" : "Logout"}
            </button>
          </div>
        </section>
        <section className="md:hidden fixed bottom-0 border-t bg-black">
          <div className="px-3 flex w-screen justify-evenly">
            {sidebarLinks2.map((link) => {
              return (
                <div
                  onClick={() => {
                    navigate(link.route);
                  }}
                  key={link.label}
                  className="flex p-4 cursor-pointer rounded-full items-center gap-3 "
                >
                  <img src={link.imgURL} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    )
  );
};

export default LeftAside;
