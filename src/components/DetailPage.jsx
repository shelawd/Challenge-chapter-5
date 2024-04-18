import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretLeft,
  faStop,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

function DetailPage() {
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [next, setNext] = useState(null);
  const [prevSurat, setPrevSurat] = useState(null);
  const [nextSurat, setNextSurat] = useState(null);
  const [selectedAyat, setSelectedAyat] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(null);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [selectedAyatAudio, setSelectedAyatAudio] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const detailSurat = async (nomorSurat) => {
    try {
      const response = await axios.get(
        `https://equran.id/api/v2/surat/${nomorSurat}`
      );
      setDetail(response.data.data);

      const prevResponse = await axios.get(
        `https://equran.id/api/v2/surat/${parseInt(nomorSurat) - 1}`
      );
      const nextResponse = await axios.get(
        `https://equran.id/api/v2/surat/${parseInt(nomorSurat) + 1}`
      );

      setPrevSurat(prevResponse.data.data);
      setNextSurat(nextResponse.data.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const nomorSurat = location.state.nomor;
    setNext(nomorSurat);
    setSelectedSurat(nomorSurat);
    setSelectedAyat(""); // Reset selectedAyat when component re-renders
    detailSurat(nomorSurat);

    return () => {
      if (audioPlaying) {
        audioPlaying.pause();
        setAudioPlaying(null);
        setSelectedAyatAudio(null);
        setIsAudioPlaying(false);
      }
    };
  }, [location.state.nomor, audioPlaying]);

  const goToSurat = async (nomorSurat) => {
    setSelectedSurat(nomorSurat);
    setNext(nomorSurat);
    detailSurat(nomorSurat);

    if (audioPlaying) {
      audioPlaying.pause();
      setAudioPlaying(null);
      setSelectedAyatAudio(null);
      setIsAudioPlaying(false);
    }
  };

  const handleAyatChange = (event) => {
    setSelectedAyat(event.target.value);
  };

  const handleAudioPlay = (src, nomorSurat, nomorAyat) => {
    if (audioPlaying) {
      audioPlaying.pause();
      setAudioPlaying(null);
      setIsAudioPlaying(false);
    }
    const audio = new Audio(src);
    audio.play();
    setAudioPlaying(audio);
    setIsAudioPlaying(true);

    setSelectedSurat(nomorSurat);
    setSelectedAyatAudio(nomorAyat);
  };

  const handleAudioStop = () => {
    if (audioPlaying) {
      audioPlaying.pause();
      setAudioPlaying(null);
      setSelectedAyatAudio(null);
      setIsAudioPlaying(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4 mt-4">
        <button
          onClick={() => goToSurat(Number(next) - 1)}
          disabled={parseInt(next) === 1}
          className="bg-[#7360DF] hover:bg-[#B799FF] text-white font-bold py-2 px-4 rounded-l-lg"
        >
          <FontAwesomeIcon icon={faCaretLeft} />{" "}
          {prevSurat && prevSurat.namaLatin}
        </button>
        <button
          onClick={() => goToSurat(Number(next) + 1)}
          disabled={parseInt(next) === 114}
          className="bg-[#7360DF] hover:bg-[#B799FF] text-white font-bold py-2 px-4 rounded-r-lg"
        >
          {nextSurat && nextSurat.namaLatin}{" "}
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
      {detail && (
        <div className="container mt-5 mx-auto max-w-3xl">
          <div className="flex flex-col justify-center items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-700">
              {detail.nama}
            </h2>
            <h2 className="text-xl text-[#912BBC]">{detail.namaLatin}</h2>
            <div className="flex flex-row">
              <p className="mb-2 text-[#912BBC]">{detail.tempatTurun}-</p>
              <p className="mb-2 text-[#912BBC]"> {detail.jumlahAyat}</p>
            </div>
          </div>
          <div
            className="mb-8"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p className="mb-2" style={{ color: "#333" }}>
              {detail.deskripsi.replace(/<\/?i>/g, "")}
            </p>
            <Link
              to={{
                pathname: "/tafsir-surat",
              }}
              state={{ nomor: detail.nomor }}
              className="text-blue-500 hover:underline"
            >
              Tafsir lengkap
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-center text-2xl font-bold mb-6 text-purple-700">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </h2>
            <select
              value={selectedAyat}
              onChange={handleAyatChange}
              className="block appearance-none bg-white border  hover:border-gray-500 px-4 py-2 mb-3 pr-8 rounded shadow leading-tight outline-none focus:ring-2  focus:border-transparent"
              style={{ maxWidth: "150px" }}
            >
              <option value="">Pilih Ayat</option>
              {detail.ayat.map((ayat) => (
                <option key={ayat.nomorAyat} value={ayat.nomorAyat}>
                  Ayat {ayat.nomorAyat}
                </option>
              ))}
            </select>
            {!selectedAyat && (
              <div>
                {detail.ayat.map((ayat) => (
                  <div key={ayat.nomorAyat} className="mb-4">
                    <div
                      className="p-4  rounded-lg"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p className="mb-2">
                        <strong>{ayat.nomorAyat}</strong>
                      </p>
                      <p className="text-right text-2xl mb-2 ">
                        {ayat.teksArab}
                      </p>
                      <p className="mb-2 italic mt-8 ">{ayat.teksLatin}</p>
                      <p className="mb-2">Artinya :{ayat.teksIndonesia}</p>
                      <div className="flex flex-row">
                        <button
                          onClick={() =>
                            handleAudioPlay(
                              ayat.audio[Object.keys(ayat.audio)[0]],
                              selectedSurat,
                              ayat.nomorAyat
                            )
                          }
                          className="flex items-center gap-2 mr-2 text-sm bg-blue-500 text-white rounded-full px-2 py-1 hover:bg-blue-600 hover:text-gray-100 transition duration-300"
                        >
                          <FontAwesomeIcon icon={faPlay} />
                          Play
                        </button>
                        <button
                          onClick={handleAudioStop}
                          className="flex items-center gap-2 mr-2 text-sm bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600 hover:text-gray-100 transition duration-300"
                        >
                          <FontAwesomeIcon icon={faStop} /> Stop
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedAyat && (
              <div className="mb-4">
                <div
                  className="p-4  rounded-lg"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p className="mb-2">
                    <strong>{detail.ayat[selectedAyat - 1].nomorAyat}</strong>
                  </p>
                  <p className="text-right text-2xl mb-2 ">
                    {detail.ayat[selectedAyat - 1].teksArab}
                  </p>
                  <p className="mb-2 italic mt-8 ">
                    {detail.ayat[selectedAyat - 1].teksLatin}
                  </p>
                  <p className="mb-2">
                    Artinya :{detail.ayat[selectedAyat - 1].teksIndonesia}
                  </p>
                  <div className="flex flex-row">
                    <button
                      onClick={() =>
                        handleAudioPlay(
                          detail.ayat[selectedAyat - 1].audio[
                            Object.keys(detail.ayat[selectedAyat - 1].audio)[0]
                          ],
                          selectedSurat,
                          detail.ayat[selectedAyat - 1].nomorAyat
                        )
                      }
                      className="flex items-center gap-2 mr-2 text-sm bg-blue-500 text-white rounded-full px-2 py-1 hover:bg-blue-600 hover:text-gray-100 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faPlay} /> Play
                    </button>
                    <button
                      onClick={handleAudioStop}
                      className="flex items-center gap-2 mr-2 text-sm bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600 hover:text-gray-100 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faStop} /> Stop
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DetailPage;
