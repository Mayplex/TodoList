import { useState } from "react";
import "./App.css";
import {ItemForm} from "./ItemForm";
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AppBar, Container, Grid, Paper, Typography } from "@mui/material";

export type FilteredValueType = "all" | "completed" | "active";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilteredValueType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [toDoList, setToDoList] = useState<Array<ToDoListType>>([
    { id: todolistID1, title: "What to drink?", filter: "all" },
    { id: todolistID2, title: "What to buy?", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: "V1", isDone: true },
      { id: v1(), title: "V2", isDone: true },
      { id: v1(), title: "V3", isDone: true },
    ],
    [todolistID2]: [
      { id: v1(), title: "V1", isDone: true },
      { id: v1(), title: "V2", isDone: false },
    ],
  });

  function removeTask(id: string, toDoListId: string) {
    let todolistTasks = tasks[toDoListId];
    tasks[toDoListId] = todolistTasks.filter((task) => task.id !== id);
    setTasks({ ...tasks });
  }
  function changeFilter(value: FilteredValueType, toDoListId: string) {
    let todoList = toDoList.find((tl: any) => tl.id === toDoListId);
    if (todoList) {
      todoList.filter = value;
      setToDoList([...toDoList]);
    }
  }
  function changeChecker(taskId: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }
  function addTask(title: string, todolistID: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistID];
    tasks[todolistID] = [newTask, ...todolistTasks];
    setTasks({ ...tasks });
  }
  function changeTaskTitle(id: string, newTitle: string, toDoListId: string) {
    let newTodoListTasks = tasks[toDoListId];
    let task = newTodoListTasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  }

  function addTodoList(title: string) {
    let newTodoListID = v1();
    let newTodoList: ToDoListType = {
      id: newTodoListID,
      title: title,
      filter: "all",
    };
    setToDoList([newTodoList, ...toDoList]);
    setTasks({ ...tasks, [newTodoListID]: [] });
  }

  function removeTodoList(id: string) {
    setToDoList(toDoList.filter((td) => td.id != id));
    delete tasks[id];
    setTasks({ ...tasks });
  }
  function changeTodoListTitle(id: string, title: string) {
    const todoList = toDoList.find((t) => t.id === id);
    if (todoList) {
      todoList.title = title;
      setToDoList([...toDoList]);
    }
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

export default App;
