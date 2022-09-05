/** @format */

import { useEffect, useRef, useState } from "react";
import { addDoc, addCollection } from "firebase/firestore";

export function AddTask({
  setAddTask,
  addTask,
  taskIn,
  setTaskIn,
  tasksCollections,
  isAdd,
  user,
  setIsAdd,
}) {
  const inp1Ref = useRef();
  const inp2Ref = useRef();

  const handleAddTask = (ev) => {
    ev.preventDefault();
    addDoc(tasksCollections, {
      title: taskIn.title,
      time: taskIn.time,
      day: taskIn.day,
      userId: user.id,
    });

    setAddTask((pre) => (pre === false ? true : false));
    setIsAdd(false);
  };

  useEffect(() => {
    inp1Ref.current.value = "";
    inp2Ref.current.value = "";
  }, [addTask]);

  useEffect(() => {
    inp2Ref.current.focus();
  }, [isAdd]);

  const handleTitleTask = (e) => {
    setTaskIn((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleTaskTime = (e) => {
    var due = new Date(e.target.value);
    setTaskIn((prev) => ({
      ...prev,
      time: due.getHours() + ":" + due.getMinutes(),
      day: due.getDay() + "/" + due.getMonth() + "/" + due.getFullYear(),
    }));
  };
  return (
    <>
      <label>Task</label>
      <br></br>
      <input
        ref={inp1Ref}
        type="text"
        placeholder="Add Task"
        onChange={handleTitleTask}
      />

      <br></br>
      <br></br>

      <label>Day & Time</label>
      <br></br>
      <input
        ref={inp2Ref}
        type="datetime-local"
        onChange={handleTaskTime}
        placeholder="Add Day & Time"
      />
      <br></br>
      <br></br>
      <br></br>
      <button
        onClick={handleAddTask}
        className="btn btn-dark"
        style={{ width: 200, marginBottom: 15, marginBottom: 50 }}
      >
        Save Task
      </button>
    </>
  );
}
