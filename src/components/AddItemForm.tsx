import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPT = {
    addTask: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPT) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => {
        // debugger
        console.log('addItem')
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (<div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>add</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}