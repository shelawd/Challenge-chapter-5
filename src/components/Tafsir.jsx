import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

function Tafsir() {
  const location = useLocation();
  const [tafsir, setTafsir] = useState(null);
  const [search, setSearch] = useState("");

  const tafsirAyat = async () => {
    try {
      const response = await axios.get(
        `https://equran.id/api/v2/tafsir/${location.state.nomor}`
      );

      setTafsir(response.data.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (location.state && location.state.nomor) {
      tafsirAyat();
    }
  }, []);

  const filteredTafsir = tafsir
    ? tafsir.tafsir.filter((tafsirItem) =>
        tafsirItem.ayat.toString().includes(search)
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {tafsir && (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-purple-700">
            Tafsir Ayat
          </h1>
          <input
            type="text"
            placeholder="Cari nomor ayat..."
            value={search}
            onChange={handleSearch}
            className="mb-4 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          {filteredTafsir.length > 0 ? (
            filteredTafsir.map((tafsirItem) => (
              <div
                key={tafsirItem.ayat}
                className="mb-8 rounded-lg overflow-hidden "
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="px-6 py-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Ayat {tafsirItem.ayat}
                  </h2>
                  <p className="text-gray-700">{tafsirItem.teks}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">Tidak ada hasil yang ditemukan.</p>
          )}
        </div>
      )}
       {/* Footer */}
       <Footer />
    </div>
  );
}

export default Tafsir;
