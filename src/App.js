/** @format */
import { db, getUser, logStatus } from "./firebaseConfig";
import "./style.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, doc, getDocs } from "firebase/firestore";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Content } from "./components/content";
import { Login } from "./components/login";
import {
  onAuthStateChanged,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { REGISTER } from "./components/register";

function App() {
  const [isAdd, setIsAdd] = useState(false);
  const [task, setTask] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const tasksCollections = collection(db, "tasks");
  const [taskIn, setTaskIn] = useState([]);
  const [isLogged, setIsLogged] = useState();
  const [user, setUser] = useState([]);
  const [register, setRegister] = useState(false);
  const [newUser, setNewUser] = useState([]);
  const [login, setLogin] = useState();
  const userAuth = getAuth();

  const getTasks = async () => {
    const data = await getDocs(tasksCollections);
    const dataDocs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    dataDocs.forEach((doc) => {
      if (doc.userId == user.id) {
        setTask(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        <div>no task</div>;
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(userAuth, (u) => {
      if (u) {
        setUser((pre) => ({ ...pre, id: u.uid, dName: u.displayName }));
      } else {
        handleSignOut();
      }
    });
  }, []);
  useEffect(() => {
    console.log("in");
    getTasks();
  }, [isLogged, addTask]);

  const handleSignOut = () => {
    signOut(userAuth);
    setIsLogged(false);
  };

  return (
    <div className="App">
      <Header>Task Tracker</Header>

      {isLogged ? (
        <Content
          handleSignOut={handleSignOut}
          isLogged={isLogged}
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          task={task}
          setTask={setTask}
          addTask={addTask}
          setAddTask={setAddTask}
          tasksCollections={tasksCollections}
          taskIn={taskIn}
          setTaskIn={setTaskIn}
          user={user}
          newUser={newUser}
        />
      ) : (
        <>
          {register ? (
            <REGISTER
              setLogin={setLogin}
              user={user}
              setUser={setUser}
              setIsLogged={setIsLogged}
              newUser={newUser}
              setRegister={setRegister}
              setNewUser={setNewUser}
            />
          ) : (
            <Login
              setNewUser={setNewUser}
              newUser={newUser}
              login={login}
              setLogin={setLogin}
              setRegister={setRegister}
              setUser={setUser}
              user={user}
              setIsLogged={setIsLogged}
              isLogged={isLogged}
            />
          )}
        </>
      )}

      <Footer>Copyright &copy; 2022</Footer>
    </div>
  );
}

export default App;
