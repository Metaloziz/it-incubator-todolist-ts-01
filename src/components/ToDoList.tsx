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

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')


    const addTaskButtonCB = () => {
        if (newTaskTitle.trim()) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }

    }
    const addTaskEnterCB = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                if (newTaskTitle.trim()) {
                    props.addTask(newTaskTitle)
                    setNewTaskTitle('')
                }
                break;
        }

    }
    const changeTaskCallBack = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }


    return (<div className={s.App}>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle}
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