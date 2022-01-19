import React, {MouseEvent} from 'react';
import {buttonsPT, filterPT, taskPT} from "../App";
import s from '../App.module.css'
import {SupperInput} from "./SupperInput";
import {SupperSpan} from "./SupperSpan";
import {Button, Checkbox, IconButton, Stack} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

type ToDoListPT = {
    listID: string
    title: string
    filter: filterPT
    tasks: taskPT[]
    removeList: (listID: string) => void
    removeTask: (listID: string, taskID: string) => void
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
                             filter, removeList, changeTitleTask, changeTitleList
                         }: ToDoListPT) => {

    let all = buttons.all
    let active = buttons.active
    let completed = buttons.completed

    const changeTaskStatusCB = (taskID: MouseEvent<HTMLButtonElement>) => {
        changeTaskStatus(taskID.currentTarget.id, listID)
    }
    const removeListCB = () => removeList(listID)
    const filterAll = () => filterTasks(all, listID)
    const filterActive = () => filterTasks(active, listID)
    const filterCompleted = () => filterTasks(completed, listID)

    const changeTitleListCB = (newTitle: string) => {
        changeTitleList(newTitle, listID)
    }
    const changeTitleTaskCB = (newTitle: string, taskID: string) => {
        changeTitleTask(newTitle, listID, taskID)
    }

    return (<div className={s.App}>
            <div>
                <div style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}>
                    {/*<h3><span>{title}</span></h3>*/}
                    <h3><SupperSpan id={listID} title={title} changeTitle={changeTitleListCB}/></h3>
                    {/*<button onClick={removeListCB}>{buttons.x}</button>*/}
                    <IconButton onClick={removeListCB} size={"small"}>
                        <ClearOutlinedIcon/>
                    </IconButton>
                </div>
                <SupperInput listID={listID} addItem={addTask}/>
                <div>
                    {tasks.map((t, index) => {

                            const removeTaskCB = () => removeTask(listID, t.id)

                            return <div key={index} className={t.isDone ? s.isDone : ''}>
                                {/*<input id={t.id} type="checkbox" checked={t.isDone} readOnly onClick={changeTaskStatusCB}/>*/}
                                <Checkbox id={t.id} checked={t.isDone} onClick={changeTaskStatusCB}/>
                                {/*<span>{t.title}</span>*/}
                                <SupperSpan id={t.id} title={t.title} changeTitle={changeTitleTaskCB}/>
                                {/*<button onClick={removeTaskCB}>{buttons.x}</button>*/}
                                <IconButton onClick={removeTaskCB} size={"small"}>
                                    <ClearOutlinedIcon/>
                                </IconButton>
                            </div>
                        }
                    )}
                </div>
                <div>
                    {/*<button className={filter === all ? s.active : ''} onClick={filterAll}>{all}</button>*/}
                    {/*<button className={filter === active ? s.active : ''} onClick={filterActive}>{active}</button>*/}
                    {/*<button className={filter === completed ? s.active : ''}*/}
                    {/*        onClick={filterCompleted}>{completed}</button>*/}
                    <Stack direction="row" spacing={1}>
                        <Button onClick={filterAll}>{all}</Button>
                        <Button onClick={filterActive}>{active}</Button>
                        <Button onClick={filterCompleted}>{completed}</Button>
                    </Stack>

                </div>
            </div>
        </div>

    )
}