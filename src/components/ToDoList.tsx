import React from "react";
import {filterPT, taskPT} from "../App";
import s from '../App.module.css'

type ToDoListPT = {
    // id: string
    title: string
    // filter: string
    tasks: taskPT[]
    remuveTask: (taskID: string) => void
    filterTasks: (filter: filterPT) => void
}


export const ToDoList = (props: ToDoListPT) => {


    const callRemuve = (taskID: string) => {
        props.remuveTask(taskID)
    }


    return (<div className={s.App}>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map(t =>
                        <li id={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                callRemuve(t.id)
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