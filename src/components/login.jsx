/** @format */

import { promise1 } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BsGoogle } from "react-icons/bs";

const { REACT_APP_API_KEY } = process.env;

export function Login({
  setRegister,
  setUser,
  setIsLogged,
  setLogin,
  login,
  newUser,
  setNewUser,
}) {
  const auth = getAuth();
  const handleLogin = () => {
    if (login.email && login.pass) {
      signInWithEmailAndPassword(auth, login.email, login.pass)
        .then((userr) => {
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
    } else {
      alert("enter email and password");
    }
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
          required="required"
        />
        <br></br>
        <input
          style={{ margin: 10 }}
          type={"password"}
          placeholder={"password"}
          onChange={handlePass}
          required="required"
        />
        <br></br>
        <button
          type={"submit"}
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
          <BsGoogle style={{ marginLeft: 7, marginBottom: 4 }} />
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
          Register Now
        </button>
      </form>
    </>
  );
}
