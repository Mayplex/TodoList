import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilteredValueType } from "./App";

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilteredValueType) => void;
  changeChecker: (taskId: string, isDone: boolean) => void;
  addTask: (title: string) => void;
};
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
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
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
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
            <li key={task.id}>
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
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
