import React, {ChangeEvent} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    remove: (props: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeToDoListTitle: (title: string, todoListID: string)=>void
}

function TodoList(props: PropsType) {

    const addItem = (title: string) => {
        props.addTask(title, props.id)
    }   // add item for component
    const setAllFilterValue = () => props.changeFilter("all", props.id)
    const setActiveFilterValue = () => props.changeFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeFilter("completed", props.id)
    const getBtnClass = (filter: FilterValuesType) => props.filter === filter ? "active" : "";

    const changeToDoListTitle = (newTitle: string) =>{
        props.changeToDoListTitle(newTitle, props.id)
    }

    const tasksJSX = props.tasks.map(task => {
        const getClasses = () => task.isDone ? "is-done" : "";
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const removeTask = () => props.removeTask(task.id, props.id)

        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle, props.id)
        }
        return (
            <li key={task.id} className={getClasses()}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}
                />
                {/*<span>{task.title}</span>*/}
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>
                <button onClick={() => props.remove(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addItem}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={getBtnClass("all")}
                    onClick={setAllFilterValue}>All
                </button>
                <button
                    className={getBtnClass("active")}
                    onClick={setActiveFilterValue}>Active
                </button>
                <button
                    className={getBtnClass("completed")}
                    onClick={setCompletedFilterValue}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;