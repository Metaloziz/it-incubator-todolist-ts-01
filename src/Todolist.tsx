import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (CurrentId: string, value: boolean, todoListID: string) => void
    filter:FilterValuesType
}

export function Todolist({filter,...props}: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState(false)
    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id);
            setTitle("");
            // setError(true)
        }else{
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
            setError(false)
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    // const onChangeHandlerForChangeStatus=(CurrentId: string,event:ChangeEvent<HTMLInputElement>)=>{
    //     props.changeStatus(CurrentId,event.currentTarget.checked)
    // }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked, props.id)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={(event)=>props.changeStatus(t.id,event.currentTarget.checked, props.id)}/>
                        {/*<input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>*/}
                        <span className={t.isDone ? styles.isDone : ''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

        <div>
            <button className={filter==='all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={filter==='active' ? styles.activeFilter : ''}  onClick={onActiveClickHandler}>Active</button>
            <button className={filter==='completed' ? styles.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
