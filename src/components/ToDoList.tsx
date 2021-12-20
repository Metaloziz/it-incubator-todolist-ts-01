import React, {MouseEvent} from 'react';

import {buttonsPT, filterPT, taskPT} from "../App";
import s from '../App.module.css'
import {SupperInput} from "./SupperInput";
import {SupperSpan} from "./SupperSpan";

type ToDoListPT = {
    listID: string
    title: string
    filter: filterPT
    tasks: taskPT[]
    removeTask: (listID: string, taskID: string) => void
    removeList: (listID: string) => void
    filterTasks: (filter: filterPT, listID: string) => void
    addTask: (title: string, listID: string) => void
    changeTaskStatus: (listID: string, taskID: string) => void
    buttons: buttonsPT
    changeTitleList: (newTitle: string, listID: string) => void
    changeTitleTask: (newTitle: string, listID: string, taskID: string) => void
}


export const ToDoList = ({
                             listID, buttons,
                             filterTasks, tasks,
                             changeTaskStatus, title,
                             removeTask, addTask,
                             filter, removeList, changeTitleList, changeTitleTask
                         }: ToDoListPT) => {

    let all = buttons.all
    let active = buttons.active
    let completed = buttons.completed

    const changeTaskStatusCB = (taskID: MouseEvent<HTMLInputElement>) => {
        changeTaskStatus(taskID.currentTarget.id, listID)
    }
    const removeListCB = () => removeList(listID)

    const filterAll = () => filterTasks(all, listID)
    const filterActive = () => filterTasks(active, listID)
    const filterCompleted = () => filterTasks(completed, listID)

    const changeTitleListCB = (newTitle: string) => {
        changeTitleList(newTitle, listID)
    }
    const changeTitleTaskCB = (taskID: string, newTitle: string) => {
        changeTitleTask(newTitle, listID, taskID)
    }

    return (<div className={s.App}>
            <div>
                <div className={s.title}>
                    <h3><SupperSpan id={listID} title={title} changeTitle={changeTitleListCB}/></h3>
                    <button onClick={removeListCB}>{buttons.x}</button>
                </div>
                <SupperInput listID={listID} addItem={addTask}/>
                <ul>
                    {tasks.map((t, index) => {

                            const removeTaskCB = () => removeTask(listID, t.id)

                            return <li key={index} className={t.isDone ? s.isDone : ''}>
                                <input id={t.id} type="checkbox" checked={t.isDone} readOnly onClick={changeTaskStatusCB}/>
                                <span>{t.title}</span>
                                {/*<SupperSpan id={t.id} title={t.title} changeTitle={changeTitleTaskCB}/>*/}
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