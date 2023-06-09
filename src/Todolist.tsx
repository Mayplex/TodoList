import { IconButton } from "@mui/material";
import { Button, Checkbox } from "@mui/material";
import { FilteredValueType } from "./App";
import EditableSpan from "./EditableSpan";
import ItemForm from "./ItemForm";
import { Delete } from "@mui/icons-material";

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

export function Todolist(props: PropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };

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
        {props.tasks.map((task) => {
          const onChangeHandler = (e: any) => {
            props.changeChecker(task.id, e.currentTarget.checked, props.id);
          };
          const removeTask = () => {
            props.removeTask(task.id, props.id);
          };
          const onTitlechangeHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };

          return (
            <li key={task.id}>
              <Checkbox
                color="secondary"
                onChange={onChangeHandler}
                checked={task.isDone}
              />
              <EditableSpan
                value={task.title}
                onChange={onTitlechangeHandler}
              />

              <IconButton onClick={removeTask}>
                <Delete />
              </IconButton>
            </li>
          );
        })}
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
}
