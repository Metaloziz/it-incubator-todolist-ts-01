import s from "../App.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type SupperInputPT = {
    listID: string
    addItem: (title: string, listID: string) => void
}


export const SupperInput = ({addItem, listID}: SupperInputPT) => {

    const [error, setError] = useState<boolean>(false)
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const addTaskButtonCB = () => {
        if (newTaskTitle.trim()) {
            addItem(newTaskTitle, listID)
            setNewTaskTitle('')
        } else setError(true)
    }
    const addTaskEnterCB = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                if (newTaskTitle.trim()) {
                    addItem(newTaskTitle, listID)
                    setNewTaskTitle('')
                } else setError(true)
                break;
        }

    }
    const changeInputCB = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(event.currentTarget.value)
    }

    return (<div>
            <input className={error ? s.input : ''} value={newTaskTitle}
                   onChange={changeInputCB}
                   onKeyPress={addTaskEnterCB}/>
            <button onClick={addTaskButtonCB}>add</button>
            {error ? <div className={s.errorMessage}>error</div> : ''}
        </div>

    )
}