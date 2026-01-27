import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const [active, SetActive] = useState(false);
  const [menuOpened, SetMenuOpened] = useState(false);
  const [showSearch, SetShowSearch] = useState(false);
  const loction = useLocation();
  const { navigate, user, isOwner, setShowAgencyReg, searchQuery,   setSearchQuery} = useAppContext();
  const { openSignIn } = useClerk();

  const BookingIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-scroll-text"
    >
      <path d="M8 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8" />
      <path d="M4 4v16a2 2 0 0 0 4 0V4" />
      <path d="M12 8h6" />
      <path d="M12 12h6" />
      <path d="M12 16h6" />
    </svg>
  );

  const toggleMenu = () => SetMenuOpened((prev) => !prev);

  const handleSearchChange = (e)=> {
    setSearchQuery(e.target.value);

    // Redirect to Listing page if not already there
    if(e.target.value && location.pathname !== "/listing"){
      navigate("listing")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (loction.pathname === "/") {
        SetActive(window.scrollY > 10);
      } else {
        SetActive(true);
      }
      if (window.scrollY > 10) {
        SetMenuOpened(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loction.pathname]);

  return (
    <header
      className={`${
        active ? "bg-white py-3 shadow-md" : "py-4"
      } fixed top-0 w-full left-0  right-0 z-50 transition-all duration-200`}
    >
      <div className="max-padd-container">
        {/* container */}
        <div className="flexBetween">
          {/* logo */}
          <div className="flex flex-1">
            <Link to={"/"}>
              <img
                src={assets.logoImg}
                alt="Logoimg"
                className={`${!active && "invert"} h-11 `}
              />
            </Link>
          </div>
          {/* Navbar */}
          <Navbar
            SetMenuOpened={SetMenuOpened}
            containerStyles={` ${
              menuOpened
                ? "flex items-start flex-col gap-y-8 fixed top-16  right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 rounded-xl z-50"
                : "hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
            }${!menuOpened && !active ? "text-white" : ""}`}
          />
          {/* button searchbar & profile */}
          <div className="flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8">
            <div>
              {user && (
                <button onClick={() => isOwner ? navigate("/owner") : setShowAgencyReg(true)}className={`btn-outline 
                  px-3 py-1.5 text-xs font-semibold ${!active && "text-primary ring-primary bg-transparent hover:text-black"
                  } bg-secondary/10 hover:bg-white`}>
                    {isOwner ? "Dashboard": "Register Agency"}
                  </button>
              )}
            </div>
            {/* searchbar */}
            <div className="relative hidden xl:flex items-center">
              {/* Search Input */}
              <div
                className={`${
                  active ? "bg-secondary/10" : "bg-white"
                } transition-all duration-300 ease-in-out right-1 ring-slate-900/10 rounded-full overflow-hidden ${
                  showSearch
                    ? "w-[266px] opacity-100 px-4 py-2"
                    : "w-11 opacity-0 px-0 py-0"
                }`}
              >
                {/* Search Toggle Button */}
                <input
                  onChange={handleSearchChange}
                  value={searchQuery}
                  type="text"
                  placeholder="Type here..."
                  className="w-full text-sm outline-none pr-0 placeholder:text-gray-400"
                />
              </div>
              <div
                onClick={() => SetShowSearch((prev) => !prev)}
                className={`${
                  active ? "bg-secondary/10" : "bg-primary"
                } absolute right-0 ring-1 ring-slate-900/10 p-[8px] rounded-full cursor-pointer z-10`}
              >
                <img src={assets.search} alt="searchIcon" />
              </div>
            </div>
            {/* MenuToggle */}
            <>
              {menuOpened ? (
                <img
                  src={assets.close}
                  alt="closeMenuIcon"
                  onClick={toggleMenu}
                  className={`${
                    !active && "invert"
                  } lg:hidden cursor-pointer text-xl`}
                />
              ) : (
                <img
                  src={assets.menu}
                  alt="openMenuIcon"
                  onClick={toggleMenu}
                  className={`${
                    !active && "invert"
                  } lg:hidden cursor-pointer text-xl`}
                />
              )}
            </>
            {/* userprofile */}
            <div className="group relative top-1">
              <div>
                {user ? (
                  <UserButton
                    appearance={{
                      element: {
                        userButtonAvatarBox: {
                          width: "42px",
                          height: "42px",
                        },
                      },
                    }}
                  >
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="My Bookings"
                        labelIcon={<BookingIcon />}
                        onClick={() => navigate("/my-bookings")}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                ) : (
                  <button
                    onClick={openSignIn}
                    className="btn-secondary flexCenter gap-2 rounded-full"
                  >
                    Login
                    <img src={assets.user} alt="Userlogo" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
