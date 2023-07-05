import { v1 } from "uuid";
import { TasksStateType, ToDoListType } from "../App";

export type RemoveTaskActionType = {
  type: "REMOVE_TASK";
  taskId: string;
  todolistID: string;
};
export type AddTaskActionType = {
  type: "ADD_TASK";
  title: string;
  todolistID: string;
};
export type ChangeTaskStatusActionType = {
  type: "CHANGE_TASK_STATUS";
  taskId: string;
  todolistID: string;
  isDone: boolean;
};
export type ChangeTaskTitleActionType = {
  type: "CHANGE_TASK_TITLE";
  taskId: string;
  todolistID: string;
  title: string;
};

export type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType;

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistID];
      const filteredTask = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistID] = filteredTask;
      return stateCopy;
    }
    case "ADD_TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistID];
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistID] = newTasks;
      return stateCopy;
    }
    case "CHANGE_TASK_STATUS": {
      const stateCopy = { ...state };
      let tasks = state[action.todolistID];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case "CHANGE_TASK_TITLE": {
      const stateCopy = { ...state };
      let tasks = state[action.todolistID];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }
    default:
      throw new Error("ERROR");
  }
};

export const removeTasksAC = (
  taskId: string,
  todolistID: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE_TASK",
    taskId,
    todolistID,
  };
};
export const addTasksAC = (
  title: string,
  todolistID: string
): AddTaskActionType => {
  return {
    type: "ADD_TASK",
    title,
    todolistID,
  };
};
export const changeTaskStatusAC = (
  taskId: string,
  todolistID: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE_TASK_STATUS",
    taskId,
    isDone,
    todolistID,
  };
};
export const changeTaskTitleAC = (
  taskId: string,
  todolistID: string,
  title: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE_TASK_TITLE",
    taskId,
    todolistID,
    title,
  };
};
