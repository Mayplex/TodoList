import { ToDoListType } from "../App";

type StateType = {
  age: number;
  childrenCount: number;
  name: string;
};
export type RemoveTodolistActionType = {
  type: "REMOVE_TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD_TODOLIST";
  title: string;
};
export type ChangeFilterTodolistActionType = {
  type: "CHANGE_TODOLIST_FILTER";
  id: string;
  filter: string;
};

export type ChangeTodolistTitle = {
  type: "CHANGE_TODOLIST_TITLE";
  id: string;
  title: string;
};

export type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeFilterTodolistActionType
  | ChangeTodolistTitle;

export const todolistReducer = (
  state: Array<ToDoListType>,
  action: ActionType
) => {
  switch (action.type) {
    case "REMOVE_TODOLIST":
      return state;
    default:
      throw new Error("ERROR");
  }
};
