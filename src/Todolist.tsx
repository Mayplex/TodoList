import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilteredValueType } from "./App";

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilteredValueType) => void;
  changeChecker: (taskId: string, isDone: boolean) => void;
  addTask: (title: string) => void;
  filter: FilteredValueType;
};
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function Todolist(props: PropsType) {
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Title is required!");
    }
  };
  const onAllClickHandler = () => {
    props.changeFilter("all");
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active");
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed");
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onChangeHandler = (e: any) => {
            props.changeChecker(task.id, e.currentTarget.checked);
          };
          const removeTask = () => {
            props.removeTask(task.id);
          };

          return (
            <li className={task.isDone ? "isDone" : ""} key={task.id}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={removeTask}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
