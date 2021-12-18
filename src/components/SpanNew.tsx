import React, {ChangeEvent, useState} from "react";

type SpanNewPT = {
    value: string
    changeTitle: (text: string)=>void
}
export const SpanNew = ({value, changeTitle}: SpanNewPT) => {

    const [editMod, setEditMod] = useState<boolean>(false)
    const [text, setText] = useState<string>(value)

    const callBackLocal = () => {
        setText(value) /// ?????????? why?
        setEditMod(!editMod)
    }

    const callBackLocal2 = () => {
        setEditMod(!editMod)
    }

    const callBackLocal3 = (e: ChangeEvent<HTMLInputElement>) => {
        changeTitle(e.currentTarget.value)
        setText(e.currentTarget.value)
    }

    return (
        editMod
            ? <input autoFocus value={text}
                     onBlur={callBackLocal2}
                     onChange={callBackLocal3}/>
            : <span onDoubleClick={callBackLocal}>{text}</span>
    )
}