import React, {ChangeEvent, useState} from "react";

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
        changeTitle(localTitle, id)
        setEditMod(false)
    }

    const changeText = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMod
            ? <input autoFocus value={localTitle} onChange={changeText} onBlur={disableActiveMod}/>
            : <span onDoubleClick={activeEditMod}>{title}</span>
    )
}