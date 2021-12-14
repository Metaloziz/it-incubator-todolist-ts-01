import React, {ChangeEvent, useState} from 'react';


type EditableSpanPT = {
    title: string
    changeTitle: (newTitle: string) => void

}
const EditableSpan = (props: EditableSpanPT) => {
    const [title, setTitle] = useState<string>(props.title) // it is only for value in input
    const [editMod, setEditMod] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onSetEditMod = () => {
        setEditMod(true)
    }
    const offSetEditMod = () => {
        setEditMod(false)
        props.changeTitle(title)
    }

    return (
        editMod ? <input value={title}
                         autoFocus
                         onBlur={offSetEditMod}
                         onChange={changeTitle}/>
            : <span onDoubleClick={onSetEditMod}>{title}</span>
    );
};

export default EditableSpan;