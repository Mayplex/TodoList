type StateType = {
  age: number;
  childrenCount: number;
  name: string;
};
type ActionType = {
  type: string;
  [key: string]: any;
};

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT_AGE":
      let newState = { ...state, name: action.newName };
      state.age = state.age + 1;
      return newState;
    case "INCREMENT_CHILDREN_COUNT":
      state.childrenCount = state.childrenCount + 1;
      return state;

    default:
      throw new Error("ERROR");
  }
};
