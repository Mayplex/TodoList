import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemPropsType = {
  addItem: (title: string) => void;
};

const ItemForm = (props: AddItemPropsType) => {
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
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
    <div>
      <input
        className={error ? "error" : ""}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={addItem}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ItemForm;
