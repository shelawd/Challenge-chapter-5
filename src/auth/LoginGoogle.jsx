import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin as Google } from "@react-oauth/google";


function AuthGoogle({ buttonText, }) {
  const navigate = useNavigate();
  const registerLoginWithGoogleAction = async (accessToken) => {
    console.log("token ", accessToken);
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
    //   console.log("response.data ", response.data);
      localStorage.setItem("token", token);
      navigate("/home", { state: { token: token } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
        // console.log("Response Google ", responseGoogle);
      localStorage.setItem("login", "google function");
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
  });

  return (
    <>
     <button onClick={() => loginWithGoogle()} className="flex justify-center items-center bg-white border border-gray-300 rounded-lg shadow-md w-72 px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mx-auto mt-4 mb-4">
  <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png" alt="Google Logo" className="h-6 mr-2" />
  {buttonText}
</button>



      {/* <Google
        onSuccess={(credentialResponse) => {
          localStorage.setItem("token", credentialResponse.credential);
          localStorage.setItem("login", "google component");
          navigate("/home", {
            state: { token: credentialResponse.credential },
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
    </>
  );
}

export default AuthGoogle;