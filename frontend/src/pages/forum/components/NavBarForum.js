import React, { useEffect, useRef } from "react";
import "../style.css";
import {
  SearchIcon,
  BellIcon,
  ChatIcon,
  PlusIcon,
  AcademicCapIcon,
  UserIcon,
  ChevronDownIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
const NavBarForum = () => {
  const [userDropDown, setUserDropDown] = useState("hidden");

  function UserUserDropDown(ref) {
    useEffect(() => {
      function handleCLickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setUserDropDown("hidden");
        }
      }
      document.addEventListener("mousedown", handleCLickOutside);
      return () => {
        document.removeEventListener("mousedown", handleCLickOutside);
      };
    }, [ref]);
  }
  const userDropDownRef = useRef(null);
  UserUserDropDown(userDropDownRef);
  function toggleUserDropDown() {
    if (userDropDown === "hidden") {
      setUserDropDown("block");
    } else {
      setUserDropDown("hidden");
    }
  }

  return (
    <div>
      <header className=" w-full bg-eco_dark p-2">
        <div className="mx-4 flex">
          <AcademicCapIcon className="w-8 h-8 mr-4 text-white" />
          <form
            action=""
            className="bg-eco_dark-brighter  px-3 flex rounded-md border-eco_border mx-4 flex-grow"
          >
            <SearchIcon className="text-gray-300 h-6 w-6 mt-1 " />
            <input
              type="text"
              className="bg-eco_dark-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-white"
              placeholder="Search"
            ></input>
          </form>

          {/* <button className="px-2 py-1 ">
            <ChatIcon className="text-gray-400 w-6 h-6 m-1 mx-2" />
          </button>
          <button className="px-2 py-1 ">
            <BellIcon className="text-gray-400 w-6 h-6 m-1 mx-2" />
          </button>
          <button className="px-2 py-1 ">
            <PlusIcon className="text-gray-400 w-6 h-6 m-1 mx-2" />
          </button>
          <button
            className=" rounded-md flex ml-4 border-2 border-gray-700"
            onClick={() => toggleUserDropDown()}
            ref={userDropDownRef}
          >
            <UserIcon className="w-6 h-6 text-gray-400 m-1 " />

            <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 m-1 " />
          </button>
          <div
            className={
              "  absolute right-0 top-30 mt-10 bg-eco_dark border-2 border-gray-700 z-10 rounded-md text-eco_text overflow-hidden " +
              userDropDown
            }
          >
            <button className="block flex w-55 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm">
              <LoginIcon className="w-5 h-5 mr-2" />
              Login /Sing up
            </button>
          </div> */}
        </div>
      </header>
    </div>
  );
};

export default NavBarForum;
