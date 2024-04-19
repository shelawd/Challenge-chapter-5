import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";
import Tafsir from "./components/Tafsir";
import LandingPage from "./pages/LandingPage";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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
  ]);

  return (
    <RouterProvider router={router}>
      <ToastContainer />
    </RouterProvider>
  );
}
