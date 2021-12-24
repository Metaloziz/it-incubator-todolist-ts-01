import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Input} from "@material-ui/core";


type AddItemFormPT = {
    addTask: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPT) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setError(false);
            addItem();
        }
    }

    const addItem = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
            setError(false);
        } else {
            setError(true);
        }
    }

    return (<div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <Input
                error={error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>add</button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}