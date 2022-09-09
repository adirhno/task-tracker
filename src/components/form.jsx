/** @format */

import Task from "./task";
import "../style.css";

export default function Form({
  children,
  user,
  setIsAdd,
  addTask,
  task,
  setAddTask,
  setTask,
  isLogged,
  handleSignOut,
}) {
  const handleIssAdd = (ev) => {
    ev.preventDefault();
    setIsAdd((pre) => (pre == true ? false : true));
  };
  return (
    <>
      <form className={"form"}>
        <div style={{ marginRight: 410 }}>
          <strong>WELCOME {!user.name ? user.dName : user.name}</strong>
          <br></br>
          {isLogged ? (
            <button
              className={"btn btn-dark"}
              type="button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : null}
        </div>
        <button
          onClick={handleIssAdd}
          className="btn btn-primary"
          style={{ marginLeft: 260, marginTop: 30, marginBottom: 10 }}
        >
          Add
        </button>

        <div>{children}</div>
        <br></br>

        <Task
          user={user}
          setTask={setTask}
          setAddTask={setAddTask}
          addTask={addTask}
          task={task}
        />
      </form>
    </>
  );
}
