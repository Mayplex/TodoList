import React, { useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewtMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      color="secondary"
      label="Task Title"
      variant="outlined"
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewtMode}
      value={title}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});

export default EditableSpan;
