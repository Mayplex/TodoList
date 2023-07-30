import { useState, useReducer, useCallback } from "react";
import "./App.css";
import { ItemForm } from "./ItemForm";
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AppBar, Container, Grid, Paper, Typography } from "@mui/material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolist-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useSelector, useDispatch } from "react-redux";
import { AppRootStateType } from "./state/store";

export type FilteredValueType = "all" | "completed" | "active";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilteredValueType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, Array<ToDoListType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const dispatch = useDispatch();

  const removeTask = useCallback(
    (id: string, toDoListId: string) => {
      const action = removeTaskAC(id, toDoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilteredValueType, toDoListId: string) => {
      const action = changeTodolistFilterAC(toDoListId, value);
      dispatch(action);
    },
    [dispatch]
  );

  const changeChecker = useCallback(
    (taskId: string, isDone: boolean, todolistId: string) => {
      const action = changeTaskStatusAC(taskId, isDone, todolistId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistID: string) => {
      const action = addTaskAC(title, todolistID);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string, toDoListId: string) => {
      const action = changeTaskTitleAC(id, newTitle, toDoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    (id: string) => {
      const action = removeTodolistAC(id);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (id: string, title: string) => {
      const action = changeTodolistTitleAC(id, title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <>
      <AppBar
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: " center",
          backgroundColor: "#8f1d8f",
        }}
        position="static"
      >
        <Typography variant="h6">Task Manager</Typography>
      </AppBar>
      <Container fixed className="App">
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 0px 20px 0px",
          }}
        >
          <Paper
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Add Todolist Title</h1>
            <ItemForm addItem={addTodoList} />
          </Paper>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {todolists.map((tl) => {
            let allTodoListTasks = tasks[tl.id];
            let tasksForTodoList = allTodoListTasks;

            if (tl.filter === "active") {
              tasksForTodoList = allTodoListTasks.filter(
                (task) => task.isDone === false
              );
            }
            if (tl.filter === "completed") {
              tasksForTodoList = allTodoListTasks.filter(
                (task) => task.isDone === true
              );
            }
            return (
              <Grid item>
                <Paper style={{ padding: "20px" }}>
                  <Todolist
                    key={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeFilter={changeFilter}
                    changeChecker={changeChecker}
                    addTask={addTask}
                    filter={tl.filter}
                    id={tl.id}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default AppWithRedux;
