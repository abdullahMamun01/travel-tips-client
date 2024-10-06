import React from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  const images = `https://res.cloudinary.com/db5a7lbio/image/upload/v1727892399/others/Vatican_Desktop_lndym5.jpg`;

  return (
    <header
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center z-[-1]"
      style={{ backgroundImage: `url(${images})` }}
    >
      {/* This div is the overlay that applies opacity to the background */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      {/* Content goes here */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl">
            Expert travel tips and inspiring destination guides to fuel your wanderlust
          </p>
          <Button className="bg-[#113D48] hover:bg-[#1A5A6D] text-white text-lg px-8 py-6 rounded-full transition-transform hover:scale-105 focus:ring-4 focus:ring-white">
            Start Exploring
          </Button>
        </div>
      </div>
    </header>
  );
}
