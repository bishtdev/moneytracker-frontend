import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // get the logged in user name id
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    // dispatch the logout action
    dispatch(logout());
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-lime-500 to-teal-500 p-4 shadow-lg dark:from-slate-800 dark:to-slate-900">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo/Brand */}
      <h1 className="text-xl md:text-3xl font-bold text-white dark:text-lime-400 font-playwrite">
        Money Tracker
      </h1>
  
      {/* Navigation Links and User Actions */}
      <div className="flex items-center space-x-4">
        {/* Dashboard Link */}
        <Link
          to="/dashboard"
          className="text-sm md:text-lg font-semibold text-white hover:bg-black/10 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
        >
          Dashboard
        </Link>
  
        {/* User Dropdown or Login Button */}
        {user ? (
          <div className="relative">
            {/* User Greeting Button */}
            <button
              className="flex items-center space-x-2 hover:bg-black/10 px-3 py-2 rounded-lg transition-all duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p className="text-sm md:text-lg font-semibold text-white">
                Hi, {user.name.split(" ")[0]}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
  
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-700 rounded-lg shadow-lg py-2 z-50">
                {/* Signed-in User Info */}
                <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-600 flex items-center gap-2">
                  <p className="text-sm text-gray-600 dark:text-slate-400">Signed in as</p>
                  <p className="text-md font-medium text-lime-500 dark:text-lime-400">
                    {user.name}
                  </p>
                </div>
  
                {/* Sign Out Button */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 flex items-center space-x-2 transition-all duration-200"
                >
                  <IoMdLogOut className="text-xl" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login Button
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-lime-600 hover:bg-lime-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-sm"
          >
            Login
          </button>
        )}
  
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>
  </nav>
  );
};

export default Navbar;