import React from "react";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../constants/leftsideBarlinks";
import logo from "../../assets/images/logo.png";

const LeftAside = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default LeftAside;
