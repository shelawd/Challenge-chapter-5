import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import aurora from "../assets/aurora.jpg";
import Footer from "./Footer";
import Header from "./Header";

function HomePage() {
  const navigate = useNavigate();
  const [surat, setSurat] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const listSurat = async () => {
    try {
      const response = await axios.get(`https://equran.id/api/v2/surat`, {
        headers: {
          accept: "application/json",
        },
      });
      console.log("response.data ", response.data);
      setSurat(response.data.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setUserName(response.data.data.name);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      // If user is not logged in, redirect to login page
      
      navigate("/login");
    } else {
    listSurat();

    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalID);
  }
  }, []);

  useEffect(() => {
    const filteredSurat = surat.filter(
      (data) =>
        data.nama.toLowerCase().includes(search.toLowerCase()) ||
        data.namaLatin.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredSurat);
  }, [search, surat]);

  return (
    <div>
      <Header />
      <div className="text-center mt-9">
        <div
          className="bg-[#912BBC] p-2 rounded-md text-white inline-block bg-cover"
          style={{
            width: "fit-content",
            backgroundImage: `url(${aurora})`,
          }}
        >
          <p className="text-5xl">{time}</p>
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Cari Surat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white rounded-md p-2 text-black mt-6 ms-11 outline-none focus:ring-2 focus:ring-[#7360DF] focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
        {searchResults.length > 0 ? (
          searchResults.map((data) => (
            <div
              key={data.nomor}
              className="bg-[#E4A5FF] rounded p-4 flex justify-start items-center  "
              onClick={() => {
                navigate(`/detail-surat/`, { state: { nomor: data.nomor } });
              }}
            >
              <div className="w-1/6">
                <p className="text-[#912BBC] font-bold">{data.nomor}</p>
              </div>
              <div className="w-1/3 ml-4 cursor-pointer">
                <p className="text-sm text-[#912BBC] font-bold">
                  {data.namaLatin}
                </p>
                <p className="text-[#F0F3FF]">Ayat: {data.jumlahAyat}</p>
              </div>
              <div className="w-1/2 flex justify-end">
                <h4 className="text-xl font-bold text-[#912BBC]">
                  {data.nama}
                </h4>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#912BBC] font-bold mt-4">
            Surat tidak ditemukan!
          </p>
        )}
      </div>
       {/* Footer */}
       <Footer />
    </div>
  );
}

export default HomePage;
