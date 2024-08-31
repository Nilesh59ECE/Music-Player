import React, { useEffect } from "react";
import { LoginBg } from "../assets/video";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const userCred = result.user;

      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        // Get the ID token and validate user
        const token = await userCred.getIdToken();
        const data = await validateUser(token);

        // Dispatch user data to context
        dispatch({
          type: actionType.SET_USER,
          user: data,
        });

        // Navigate to home page
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setAuth(false);
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
    }
  };

  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth === "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative w-screen h-screen">
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FcGoogle className="text-xl" />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;