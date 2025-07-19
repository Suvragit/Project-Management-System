import React from 'react';
import logo from './Assets/logo.png';


const LandingPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center px-4 text-gray-900">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-blue-100 to-green-200 animate-gradient-slow z-0" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="OptiAssign Logo"
          className="w-96 h-auto mb-16 drop-shadow-lg"
        />

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Welcome to <span className="text-blue-700">OptiAssign</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-center mb-14 text-gray-950 font-bold">
          ALIGN | ASSIGN | ACHIEVE
        </p>

        {/*Button */}
        <button 
         className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-lg">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
