import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilteredValueType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "V1", isDone: true },
    { id: v1(), title: "V2", isDone: true },
    { id: v1(), title: "V3", isDone: false },
    { id: v1(), title: "V4", isDone: true },
    { id: v1(), title: "V5", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilteredValueType>("all");
  let tasksForTodoList = tasks;

  if (filter === "active") {
    tasksForTodoList = tasks.filter((task) => task.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((task) => task.isDone === true);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }
  function changeFilter(value: FilteredValueType) {
    setFilter(value);
  }
  function changeChecker(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    let copy = [...tasks];
    setTasks(copy);
  }
  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  return (
    <div className="App">
      <Todolist
        title="List 1"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeChecker={changeChecker}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
