import React, {ChangeEvent, useState} from "react";

type SupperSpanPT = {
    id: string
    title: string
    changeTitle: (title: string, id: string) => void
}

export const SupperSpan = ({title, changeTitle, id}: SupperSpanPT) => {

    const [input, setInput] = useState<boolean>(false)
    const [localTitle, setTitle] = useState<string>(title)

    const changeInput = () => {
        setInput(true)
    }
    const changeText = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const sendText = () => {
        changeTitle(localTitle, id)
        setInput(false)
    }

    return (
        input
            ? <input autoFocus value={localTitle} onChange={changeText} onBlur={sendText}/>
            : <span onDoubleClick={changeInput}>{localTitle}</span>
    )
}