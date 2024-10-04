import React from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/image/icon.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token"); // check login

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl gap-0">
          <img src={icon} alt="icon" className="w-10 h-10 mt-1" />
          ctopedia
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 flex items-center">
          <li>
            <Link to="/cart" className="flex items-center indicator relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {isLoggedIn && (
                <span className="badge badge-sm badge-primary absolute top-0 right-0">
                  8
                </span>
              )}
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                className="ml-4 btn btn-outline btn-error"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="ml-4 btn btn-outline btn-primary">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
