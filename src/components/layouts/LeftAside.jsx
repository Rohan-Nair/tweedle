import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../constants/leftsideBarlinks";
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
          <img src={logo} className="w-12 mx-5 " />
          <div className="px-3 text-xl">
            {sidebarLinks.map((link) => {
              return (
                <div
                  onClick={() => {
                    navigate(link.route);
                  }}
                  key={link.label}
                  className="flex p-4 cursor-pointer rounded-full w-full items-center gap-3 hover:bg-gray-800 "
                >
                  <img src={link.imgURL} />
                  <p className="max-lg:hidden">{link.label}</p>
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
        <section className="md:hidden fixed bottom-0 border-t">
          <div className="px-3 flex w-screen justify-evenly">
            {sidebarLinks.map((link) => {
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
