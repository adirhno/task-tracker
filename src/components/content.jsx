/** @format */

import { AddTask } from "./addTask";
import Form from "./form";

export function Content({
  setTask,
  setAll,
  setAddTask,
  addTask,
  isAdd,
  setIsAdd,
  task,
  tasksCollections,
  taskIn,
  setTaskIn,
  user,
  handleSignOut,
  isLogged,
  newUser,
}) {
  return (
    <>
      <Form
        newUser={newUser}
        handleSignOut={handleSignOut}
        isLogged={isLogged}
        user={user}
        setTask={setTask}
        setAll={setAll}
        setAddTask={setAddTask}
        addTask={addTask}
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        task={task}
      >
        {isAdd ? (
          <AddTask
            setIsAdd={setIsAdd}
            user={user}
            isAdd={isAdd}
            tasksCollections={tasksCollections}
            taskIn={taskIn}
            setTaskIn={setTaskIn}
            addTask={addTask}
            setAddTask={setAddTask}
            setTask={setTask}
            task={task}
          />
        ) : null}
      </Form>
    </>
  );
}
