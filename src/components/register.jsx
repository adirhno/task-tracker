/** @format */

import "../style.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useReducer } from "react";
import { useRef } from "react";

export function REGISTER({
  setNewUser,
  newUser,
  setRegister,
  setIsLogged,
  setUser,
  user,
  setLogin,
}) {
  const auth = getAuth();
  const handleSignUp = () => {
    if (newUser.email && newUser.pass && newUser.name) {
      createUserWithEmailAndPassword(auth, newUser.email, newUser.pass)
        .then(
          setLogin((pre) => ({ ...pre, email: newUser.email })),
          setRegister(false)
        )
        .catch((err) => {
          setRegister(true);
          alert(err);
        });
    } else {
    }
  };
  const handleEmail = (e) => {
    setNewUser((pre) => ({ ...pre, email: e.target.value }));
  };
  const handlePass = (e) => {
    setNewUser((pre) => ({ ...pre, pass: e.target.value }));
  };
  const handleFirstName = (e) => {
    setNewUser((pre) => ({ ...pre, name: e.target.value }));
    setUser((pre) => ({ ...pre, name: e.target.value }));
  };

  const valEm = useRef();
  return (
    <>
      <br></br> <br></br>
      <div className="register">
        <form>
          <input
            onChange={handleEmail}
            ref={valEm}
            type={"text"}
            placeholder={"Email"}
            value={newUser.email ? newUser.email : ""}
            required="required"
          />

          <br></br>
          <input
            style={{ margin: 10 }}
            onChange={handlePass}
            type={"password"}
            placeholder={"Password"}
            required="required"
          />
          <br></br>
          <input
            style={{ marginBottom: 10 }}
            type={"text"}
            value={newUser.name ? newUser.name : ""}
            placeholder={"First Name"}
            onChange={handleFirstName}
            required="required"
          />
          <br></br>
          <button type="submit" className="btnC" onClick={handleSignUp}>
            Sign Up
          </button>
          <button
            className="btnC"
            type="button"
            onClick={() => {
              setRegister(false);
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
