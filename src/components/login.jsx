/** @format */

import { getUser, promise1 } from "../firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef } from "react";

const { REACT_APP_API_KEY } = process.env;

export function Login({
  setRegister,
  user,
  setUser,
  setIsLogged,
  setLogin,
  login,
  newUser,
  setNewUser,
}) {
  const auth = getAuth();
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, login.email, login.pass)
      .then((userr) => {
        console.log("gtom the login comp" + JSON.stringify(user));
        setUser((pre) => ({
          ...pre,
          id: userr.user.uid,
        }));
        setIsLogged(true);
        setRegister(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handlePass = (e) => {
    setLogin((pre) => ({ ...pre, pass: e.target.value }));
  };

  const handleEmail = (e) => {
    setLogin((pre) => ({ ...pre, email: e.target.value }));
  };

  const loginWithGoogle = (e) => {
    e.preventDefault();
    promise1().then((u) => {
      setRegister(false);
      setIsLogged(true);
    });
  };

  /////////////////////////////////////////////////////

  return (
    <>
      <form className="form" style={{ textAlign: "center", marginTop: 100 }}>
        <input
          type={"text"}
          placeholder={"Email"}
          onChange={handleEmail}
          onClick={() => {
            setNewUser((pre) => ({ ...pre, email: "" }));
            setLogin((pre) => ({ ...pre, email: "" }));
          }}
          value={newUser.email == "" ? login.email : newUser.email}
        />
        <br></br>
        <input
          style={{ margin: 10 }}
          type={"password"}
          placeholder={"password"}
          onChange={handlePass}
        />
        <br></br>
        <button
          type={"Button"}
          className={"btn btn-dark"}
          onClick={handleLogin}
        >
          Sign In
        </button>

        <button
          style={{ marginLeft: 10 }}
          className="btn btn-dark"
          onClick={loginWithGoogle}
        >
          Google
          <img src="https://img.icons8.com/color/20/000000/google-logo.png" />
        </button>
        <br></br>
        <button
          className="btnC"
          onClick={() => {
            setRegister((pre) => (pre === false ? true : false));
            // setNewUser((pre) => ({ ...pre, email: "", pass: "" }));
          }}
          type={"button"}
        >
          register now
        </button>
      </form>
    </>
  );
}
