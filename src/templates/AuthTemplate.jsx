import React from "react";
import { Outlet } from "react-router-dom";

export const AuthTemplate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {/* Animated circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Stars */}
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div
          className="absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-1 h-1 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/6 w-1 h-1 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <a href="/" className="flex items-center">
          <img
            src="https://i.imgur.com/lC22izJ.png"
            width={60}
            height={60}
            alt="BC85 MOVIE"
            className="filter drop-shadow-lg"
          />
        </a>
        {/* <span className="text-white font-bold text-xl ml-2">BC85 MOVIE</span> */}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-10">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm z-10">
        © 2024 BC85 Movie. All rights reserved.
      </div>
    </div>
  );
};
export default AuthTemplate;
