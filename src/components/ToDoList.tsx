import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';

import {buttonsPT, filterPT, taskPT} from "../App";
import s from '../App.module.css'

type ToDoListPT = {
    listID: string
    title: string
    filter: filterPT
    tasks: taskPT[]
    removeTask: (taskID: string, listID: string) => void
    removeList: (listID: string) => void
    filterTasks: (filter: filterPT, toDoListID: string) => void
    addTask: (title: string, listID: string) => void
    changeTaskStatus: (taskID: string, listID: string) => void
    buttons: buttonsPT
}


export const ToDoList = ({
                             listID,
                             buttons,
                             filterTasks,
                             tasks,
                             changeTaskStatus,
                             title,
                             removeTask,
                             addTask,
                             filter, removeList
                         }: ToDoListPT) => {
    let all = buttons.all
    let active = buttons.active
    let completed = buttons.completed

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const addTaskButtonCB = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle, listID)
            setNewTaskTitle('')
        } else setError(true)


    }
    const addTaskEnterCB = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                if (newTaskTitle.trim()) {
                    addTask(newTaskTitle, listID)
                    setNewTaskTitle('')
                } else setError(true)
                break;
        }

    }
    const changeInputCB = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(event.currentTarget.value)
    }
    const changeTaskStatusCB = (taskID: MouseEvent<HTMLInputElement>) => {
        changeTaskStatus(taskID.currentTarget.id, listID)
    }

    const removeListCB = () => {
        removeList(listID)
    }

    const filterAll = () => filterTasks(all, listID)
    const filterActive = () => filterTasks(active, listID)
    const filterCompleted = () => filterTasks(completed, listID)


    return (<div className={s.App}>
            <div>
                <div className={s.title}>
                    <h3>{title}</h3>
                    <button onClick={removeListCB}>{buttons.x}</button>
                </div>

                <div>
                    <input className={error ? s.input : ''} value={newTaskTitle}
                           onChange={changeInputCB}
                           onKeyPress={addTaskEnterCB}/>
                    <button onClick={addTaskButtonCB}>{buttons.added}</button>
                    {error ? <div className={s.errorMessage}>error</div> : ''}
                </div>
                <ul>
                    {tasks.map((t, index) => {

                            const removeTaskCB = () => removeTask(t.id, listID)

                            return <li key={index} className={t.isDone ? s.isDone : ''}>
                                <input id={t.id} type="checkbox" checked={t.isDone} readOnly onClick={changeTaskStatusCB}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskCB}>{buttons.x}</button>
                            </li>
                        }
                    )}
                </ul>
                <div className={s.filter}>
                    <button className={filter === all ? s.active : ''} onClick={filterAll}>{all}</button>
                    <button className={filter === active ? s.active : ''} onClick={filterActive}>{active}</button>
                    <button className={filter === completed ? s.active : ''}
                            onClick={filterCompleted}>{completed}</button>
                </div>
            </div>
        </div>

    )
}