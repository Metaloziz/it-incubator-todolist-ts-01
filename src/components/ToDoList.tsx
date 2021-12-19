import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {filterPT, taskPT} from "../App";
import s from '../App.module.css'

type ToDoListPT = {
    // id: string
    title: string
    // filter: string
    tasks: taskPT[]
    removeTask: (taskID: string) => void
    filterTasks: (filter: filterPT) => void
    addTask: (title: string) => void
}


export const ToDoList = (props: ToDoListPT) => {

    const [title, setTitle] = useState<string>('')


    const addTaskButtonCB = () => {
        if (title.trim()) {
            props.addTask(title)
            setTitle('')
        }

    }
    const addTaskEnterCB = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                if (title.trim()) {
                    props.addTask(title)
                    setTitle('')
                }
                break;
        }

    }
    const changeTaskCallBack = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    return (<div className={s.App}>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={changeTaskCallBack}
                           onKeyPress={addTaskEnterCB}/>
                    <button onClick={addTaskButtonCB}>+</button>
                </div>
                <ul>
                    {props.tasks.map((t, index) =>
                        <li id={t.id} key={index}>
                            <input type="checkbox" checked={t.isDone} readOnly/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
                        </li>
                    )}
                </ul>
                <div className={s.filter}>
                    <button onClick={() => props.filterTasks('all')}>All</button>
                    <button onClick={() => props.filterTasks('active')}>Active</button>
                    <button onClick={() => props.filterTasks('completed')}>Completed</button>
                </div>
            </div>
        </div>

    )
}