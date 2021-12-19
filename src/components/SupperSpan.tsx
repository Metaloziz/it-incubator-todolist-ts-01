import s from "../App.module.css";
import React, {ChangeEvent, useState} from "react";
import {buttonsPT} from "../App";

type SupperSpanPT = {
    id: string
    title: string
    changeTitle: (id: string, title: string) => void
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
    const sendTExt = () => {
        changeTitle(id, localTitle)
        setInput(false)
    }

    return (
        input
            ? <input autoFocus value={localTitle} onChange={changeText} onBlur={sendTExt}/>
            : <span onDoubleClick={changeInput}>{localTitle}</span>
    )
}