import { IconButton } from "@mui/material";
import { Button, Checkbox } from "@mui/material";
import { FilteredValueType } from "./App";
import EditableSpan from "./EditableSpan";
import { ItemForm } from "./ItemForm";
import { Delete } from "@mui/icons-material";
import React, { useCallback } from "react";
import { Task } from "./Task";

type PropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: string, toDoListId: string) => void;
  changeFilter: (value: FilteredValueType, toDoListId: string) => void;
  changeChecker: (taskId: string, isDone: boolean, todolistId: string) => void;
  addTask: (title: string, todolistID: string) => void;
  filter: FilteredValueType;
  id: string;
  removeTodoList: (id: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistID: string
  ) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const Todolist = React.memo(function (props: PropsType) {
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props.changeTodolistTitle, props.id]
  );

  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.id);
  }, [props.changeFilter, props.id]);

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter("active", props.id);
  }, [props.changeFilter, props.id]);

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter("completed", props.id);
  }, [props.changeFilter, props.id]);

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => {
      t.isDone === false;
    });
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => {
      t.isDone === true;
    });
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <div>
        <ItemForm addItem={addTask} />
      </div>
      <ul>
        {tasksForTodolist.map((task) => (
          <Task
            task={task}
            changeTaskStatus={props.changeChecker}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            todolistId={props.id}
            key={task.id}
          />
        ))}
      </ul>
      <div>
        <Button
          color={props.filter === "all" ? "success" : "primary"}
          variant="text"
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={props.filter === "active" ? "success" : "primary"}
          variant="text"
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={props.filter === "completed" ? "success" : "primary"}
          variant="text"
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
