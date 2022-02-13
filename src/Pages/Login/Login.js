import React from "react";
import "./Login.scss";
import "../../App.scss";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";

export default function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div className="outer">
      <div className="loginPage container flex">
        <div className="loginCont">
          <h3>Log in in with Google to Continue</h3>
          <Button style="btn btn-primary" onClick={signInWithGoogle}>
            login
          </Button>
        </div>
      </div>
    </div>
  );
}
