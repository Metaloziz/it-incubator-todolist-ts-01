import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


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
        setNewTaskTitle(event.currentTarget.value.trim())
    }


    return ( <div style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}>
            <TextField error={error}
                       value={newTaskTitle}
                       label="New name task"
                       onChange={changeInputCB}
                       onKeyPress={addTaskEnterCB}
                       variant={"filled"}
                       helperText={error ? 'Field is required' : ''}
            />
            <IconButton onClick={addTaskButtonCB} size={"large"}>
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>
        </div>

    )
}