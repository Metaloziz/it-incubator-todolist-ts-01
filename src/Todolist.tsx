import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {SpanNew} from "./components/SpanNew";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeTitle: (todolistId: string, taskId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        console.log('addTask')
        if (title.trim() !== "") {
            props.addTask(props.todolistId, title.trim());
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");


    // const callBackLocal = (title: string, e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeTitle(props.todolistId, e.currentTarget.id, title)
    // }

    // debugger
    return <div>
        <h3>{props.title}</h3>
        <AddItemForm addTask={addTask}/>
        <ul>{props.tasks.map(t => {

            const onClickHandler = () => {
                props.removeTask(props.todolistId, t.id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
            }

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={t.isDone}/>
                {/*<span>{t.title}</span>*/}
                <SpanNew value={t.title} changeTitle={(text)=>{
                    props.changeTitle(props.todolistId, t.id, text )
                }}/>
                <button onClick={onClickHandler}>x</button>
            </li>
        })
        }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
