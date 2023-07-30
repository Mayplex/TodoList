import { useState, useReducer } from "react";
import "./App.css";
import {ItemForm} from "./ItemForm";
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

export type FilteredValueType = "all" | "completed" | "active";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilteredValueType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [toDoList, dispatchToToDoList] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to drink?", filter: "all" },
    { id: todolistId2, title: "What to buy?", filter: "all" },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "V1", isDone: true },
      { id: v1(), title: "V2", isDone: true },
      { id: v1(), title: "V3", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "V1", isDone: true },
      { id: v1(), title: "V2", isDone: false },
    ],
  });

  function removeTask(id: string, toDoListId: string) {
    const action = removeTaskAC(id, toDoListId);
    dispatchToTasks(action);
  }
  function changeFilter(value: FilteredValueType, toDoListId: string) {
    const action = changeTodolistFilterAC(toDoListId, value);
    dispatchToToDoList(action);
  }
  function changeChecker(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispatchToTasks(action);
  }
  function addTask(title: string, todolistID: string) {
    const action = addTaskAC(title, todolistID);
    dispatchToTasks(action);
  }
  function changeTaskTitle(id: string, newTitle: string, toDoListId: string) {
    const action = changeTaskTitleAC(id, newTitle, toDoListId);
    dispatchToTasks(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasks(action);
    dispatchToToDoList(action);
  }

  function removeTodoList(id: string) {
    const action = removeTodolistAC(id);
    dispatchToTasks(action);
  }
  function changeTodoListTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchToToDoList(action);
  }

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
          {toDoList.map((todolist) => {
            let allTodoListTasks = tasks[todolist.id];
            let tasksForTodoList = allTodoListTasks;

            if (todolist.filter === "active") {
              tasksForTodoList = allTodoListTasks.filter(
                (task) => task.isDone === false
              );
            }
            if (todolist.filter === "completed") {
              tasksForTodoList = allTodoListTasks.filter(
                (task) => task.isDone === true
              );
            }
            return (
              <Grid item>
                <Paper style={{ padding: "20px" }}>
                  <Todolist
                    key={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeFilter={changeFilter}
                    changeChecker={changeChecker}
                    addTask={addTask}
                    filter={todolist.filter}
                    id={todolist.id}
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

export default AppWithReducers;
