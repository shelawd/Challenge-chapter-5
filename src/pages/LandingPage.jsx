import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#401F71] to-black">
      <h1 className="text-4xl font-bold mb-8 text-white">Quran App</h1>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <img
          src="/src/assets/masjid.jpg"
          alt="Masjid"
          className="w-64 h-64 object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold text-[#AC87C5]">Learn Quran</h2>
      <h2 className="text-2xl font-bold text-[#F2AFEF]">
        and read it once every day
      </h2>
      <p className="text-white text-center italic">
        "Bacalah olehmu sekalian Al-Qur'an karena sesungguhnya Al-Qur'an <br />{" "}
        itu akan menjadi syafaat/penolong bagi para pembacanya di hari kiamat."
        (HR Muslim)
      </p>
      <Link
        to="/home"
        className="mt-8 px-4 py-2 bg-[#7360DF] hover:bg-[#7F27FF] text-white rounded-xl  transition duration-100 font-semibold"
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
