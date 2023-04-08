import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";

export type FilteredValueType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState([
    { id: 1, title: "V1", isDone: true },
    { id: 2, title: "V2", isDone: true },
    { id: 3, title: "V3", isDone: false },
    { id: 4, title: "V4", isDone: true },
    { id: 5, title: "V5", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilteredValueType>("all");
  let tasksForTodoList = tasks;

  if (filter === "active") {
    tasksForTodoList = tasks.filter((task) => task.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((task) => task.isDone === true);
  }

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }
  function changeFilter(value: FilteredValueType) {
    setFilter(value);
  }

  return (
    <div className="App">
      <Todolist
        title="List 2"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
