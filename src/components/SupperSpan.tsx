import s from "../App.module.css";
import React, {ChangeEvent, useState} from "react";
import {buttonsPT} from "../App";

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
    const sendTExt = () => {
        changeTitle(localTitle, id)
        setInput(false)
    }

    return (
        input
            ? <input autoFocus value={localTitle} onChange={changeText} onBlur={sendTExt}/>
            : <span onDoubleClick={changeInput}>{localTitle}</span>
    )
}