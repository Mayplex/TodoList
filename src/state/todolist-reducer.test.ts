import { v1 } from "uuid";
import { ActionType, todolistReducer } from "./todolist-reducer";
import { FilteredValueType, ToDoListType } from "../App";

test("correct todolist should be removed", () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState: Array<ToDoListType> = [
    { id: todolistID1, title: "What to drink?", filter: "all" },
    { id: todolistID2, title: "What to buy?", filter: "all" },
  ];

  const endState = todolistReducer(startState, {
    type: "REMOVE_TODOLIST",
    id: todolistID1,
  });

  expect(endState.length).toBe(1);
});

test("correct todolist should be added", () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const newtodolistTitle = "newtodolist";

  const startState: Array<ToDoListType> = [
    { id: todolistID1, title: "What to drink?", filter: "all" },
    { id: todolistID2, title: "What to buy?", filter: "all" },
  ];

  const endState = todolistReducer(startState, {
    type: "ADD_TODOLIST" as const,
    title: newtodolistTitle,
  });

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newtodolistTitle);
});

test("correct todolist should change name", () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const newtodolistTitle = "newtodolist";

  const startState: Array<ToDoListType> = [
    { id: todolistID1, title: "What to drink?", filter: "all" },
    { id: todolistID2, title: "What to buy?", filter: "all" },
  ];

  const action: ActionType = {
    type: "CHANGE_TODOLIST_TITLE" as const,
    id: todolistID1,
    title: newtodolistTitle,
  };

  const endState = todolistReducer(startState, action);

  expect(endState[0].title).toBe(newtodolistTitle);
  expect(endState[1].title).toBe("What to buy?");
});

test("correct filter should change todolist", () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const newFilter: FilteredValueType = "completed";

  const startState: Array<ToDoListType> = [
    { id: todolistID1, title: "What to drink?", filter: "all" },
    { id: todolistID2, title: "What to buy?", filter: "all" },
  ];

  const action: ActionType = {
    type: "CHANGE_TODOLIST_FILTER",
    id: todolistID1,
    filter: newFilter,
  };

  const endState = todolistReducer(startState, action);

  expect(endState[0].filter).toBe("completed");
  expect(endState[1].filter).toBe("all");
});
