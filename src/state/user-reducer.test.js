import React from "react";
import { userReducer } from "./user-reducer";

test("should increment age", () => {
  const startState = {
    age: 20,
    childrenCount: 4,
    name: "Andrew",
  };

  const newName = "Olga";

  const endState = userReducer(startState, {
    type: "INCREMENT_AGE",
    newName: newName,
  });

  expect(endState.name).toBe(newName);
});

test("INCREMENT_CHILDREN_COUNT", () => {
  const startState = {
    age: 20,
    childrenCount: 4,
    name: "Andrew",
  };

  const endState = userReducer(startState, {
    type: "INCREMENT_CHILDREN_COUNT",
  });

  expect(endState.childrenCount).toBe(5);
});
