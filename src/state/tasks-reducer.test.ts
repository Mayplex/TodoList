import React from "react";
import { TasksStateType } from "../App";
import {
  addTasksAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTasksAC,
  tasksReducer,
} from "./tasks-reducer";

test("remove task", () => {
  const startState: TasksStateType = {
    todolistID1: [
      {
        id: "1",
        title: "Orange",
        isDone: true,
      },
      {
        id: "2",
        title: "Blue",
        isDone: false,
      },
      {
        id: "3",
        title: "Yellow",
        isDone: true,
      },
    ],

    todolistID2: [
      {
        id: "1",
        title: "Green",
        isDone: false,
      },
      {
        id: "2",
        title: "Dark",
        isDone: true,
      },
    ],
  };

  const action = removeTasksAC("2", "todolistID2");
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistID1: [
      {
        id: "1",
        title: "Orange",
        isDone: true,
      },
      {
        id: "2",
        title: "Blue",
        isDone: false,
      },
      {
        id: "3",
        title: "Yellow",
        isDone: true,
      },
    ],

    todolistID2: [
      {
        id: "1",
        title: "Green",
        isDone: false,
      },
    ],
  });
});

test("add task", () => {
  const startState: TasksStateType = {
    todolistID1: [
      {
        id: "1",
        title: "Orange",
        isDone: true,
      },
      {
        id: "2",
        title: "Blue",
        isDone: false,
      },
      {
        id: "3",
        title: "Yellow",
        isDone: true,
      },
    ],

    todolistID2: [
      {
        id: "1",
        title: "Green",
        isDone: false,
      },
      {
        id: "2",
        title: "Dark",
        isDone: true,
      },
    ],
  };

  const action = addTasksAC("Orange", "todolistID2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"].length).toBe(3);
  expect(endState["todolistID2"][0]?.title).toEqual("Orange");
});

test("change task status", () => {
  const startState: TasksStateType = {
    todolistID1: [
      {
        id: "1",
        title: "Orange",
        isDone: true,
      },
      {
        id: "2",
        title: "Blue",
        isDone: false,
      },
      {
        id: "3",
        title: "Yellow",
        isDone: true,
      },
    ],

    todolistID2: [
      {
        id: "1",
        title: "Green",
        isDone: false,
      },
      {
        id: "2",
        title: "Dark",
        isDone: false,
      },
    ],
  };

  const action = changeTaskStatusAC("1", "todolistID2", true);
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"][1]?.isDone).toBeFalsy();
  expect(endState["todolistID2"][0]?.isDone).toBeTruthy();
});

test("change task title", () => {
  const startState: TasksStateType = {
    todolistID1: [
      {
        id: "1",
        title: "Orange",
        isDone: true,
      },
      {
        id: "2",
        title: "Blue",
        isDone: false,
      },
      {
        id: "3",
        title: "Yellow",
        isDone: true,
      },
    ],

    todolistID2: [
      {
        id: "1",
        title: "Green",
        isDone: false,
      },
      {
        id: "2",
        title: "Dark",
        isDone: false,
      },
    ],
  };

  const action = changeTaskTitleAC("1", "todolistID2", "Blue");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"][1].title).toBe("Blue");
});
