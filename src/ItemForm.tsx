import { Button, TextField, Alert } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import React from "react";

type AddItemPropsType = {
  addItem: (title: string) => void;
};

export const ItemForm = React.memo((props: AddItemPropsType) => {
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      props.addItem(title);
      setTitle("");
    }
  };
  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required!");
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <TextField
          label="Task Name"
          variant="standard"
          error={!!error}
          className={error ? "error" : ""}
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <Button
          style={{ height: " 48px " }}
          variant="contained"
          color="secondary"
          size="small"
          onClick={addItem}
        >
          +
        </Button>
      </div>

      {error && (
        <Alert severity="error" className="error-message">
          {error}
        </Alert>
      )}
    </div>
  );
});
