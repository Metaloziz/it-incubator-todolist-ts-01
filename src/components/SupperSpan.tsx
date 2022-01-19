import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type SupperSpanPT = {
    id: string
    title: string
    changeTitle: (newTitle: string, id: string) => void
}

export const SupperSpan = ({title, changeTitle, id}: SupperSpanPT) => {

    const [localTitle, setTitle] = useState<string>('')
    const [editMod, setEditMod] = useState<boolean>(false)

    const activeEditMod = () => {
        setTitle(title)
        setEditMod(true)
    }
    const disableActiveMod = () => {
        if (localTitle) {
            changeTitle(localTitle, id)
            setEditMod(false)
        } else setEditMod(false)

    }

    const changeText = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMod
            ? <TextField variant={"filled"}
                         autoFocus
                         value={localTitle}
                         onChange={changeText}
                         onBlur={disableActiveMod}
                         label={title}/>
            : <span onDoubleClick={activeEditMod}>{title}</span>
    )
}