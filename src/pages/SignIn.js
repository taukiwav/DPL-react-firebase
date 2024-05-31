import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Button } from "../components/Button";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import "../App.css";
import "./SignIn.css"

export default function SignIn() {
  const navigate = useNavigate()
  const {isAuth} = useGetUserInfo()

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider)
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    }
    localStorage.setItem("auth", JSON.stringify(authInfo))
    navigate("/add-match")
    return(authInfo) //debugging what seems to be JSON issue?
  }

  if (isAuth) {
    return <Navigate to="/add-match"/>
  }

  return (
    <div className="sign-in">
      <div className="sign-in-container">
        <h1>SIGN IN</h1>
        <p>Sign in with Google to add match data</p>
        <Button
          className="login-btn"
          buttonStyle="btn--alt"
          buttonSize="btn--large"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>

      </div>



    </div>

  )

}
