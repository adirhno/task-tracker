/** @format */
import "../style.css";
import { FaTimes } from "react-icons/fa";
import { db, userName } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default function Task({ task, setTask, user }) {
  const onDelete = (id) => {
    deleteDoc(doc(db, "tasks", id));
    setTask(task.filter((task) => task.id !== id));
  };
  return (
    <>
      {task
        ? task.map((task) => {
            if (user.id == task.userId) {
              return (
                <div key={task.id} id={task.id}>
                  <div className="border" style={{ width: "auto" }}>
                    <div style={{ marginTop: 0 }} className={"innerBorder"}>
                      <FaTimes
                        className="delBtn"
                        onClick={() => {
                          onDelete(task.id);
                        }}
                        style={{
                          cursor: "pointer",
                          color: "white",
                          marginLeft: 160,
                        }}
                      />
                      <h6 style={{ marginLeft: 0 }}>{task.title}</h6>
                      <p style={{ textAlign: "center" }}>
                        {task.time} <span>{task.day}</span>
                      </p>
                    </div>
                  </div>

                  <br></br>
                </div>
              );
            } else if (user.id !== task.userId) {
              <div>no task added!</div>;
            }
          })
        : null}
    </>
  );
}
