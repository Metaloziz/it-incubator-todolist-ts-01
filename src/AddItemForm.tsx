import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPT = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPT) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const oneKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    }
    const errorClass = error ? "error" : "";
    const errorMessage = <div style={{color: "red"}}>Title is required!</div>

    return (
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={oneKeyPressAddTask}
                className={errorClass}
            />
            <button onClick={addItem}>+</button>
            {error && errorMessage}
        </div>
    );
};

export default AddItemForm;