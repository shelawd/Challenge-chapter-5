import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";
import Tafsir from "./components/Tafsir";
import LandingPage from "./pages/LandingPage";
// import DeskripsiPage from "./components/Deskripsi";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/detail-surat",
      element: <DetailPage />,
    },
    {
      path: "/tafsir-surat",
      element: <Tafsir />,
    },
    // {
    //   path: "/deskripsi-surat",
    //   element: <DeskripsiPage />
    // },
  ]);
  console.log("test");

  return <RouterProvider router={router} />;
}
