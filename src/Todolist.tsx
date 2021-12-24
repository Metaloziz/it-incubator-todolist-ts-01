import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {SpanNew} from "./components/SpanNew";
import {Button, ButtonGroup, Typography} from "@material-ui/core";

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

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, "all");
    }
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");


    // const callBackLocal = (title: string, e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeTitle(props.todolistId, e.currentTarget.id, title)
    // }

    // debugger
    return (
        <div style={{
            padding: "10px",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "space-between",
            minHeight: '300px'
        }}>
            <div >
                <Typography variant={"h6"} align={"left"}>{props.title}</Typography>
                <AddItemForm addTask={addTask}/>
            </div>
            <div style={{
                height: '150px',
                display: "flex",
                flexDirection: 'column',
                justifyContent: "space-around",
            }}>{props.tasks.map(t => {

                const onClickHandler = () => {
                    props.removeTask(props.todolistId, t.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                }

                return <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }} key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox"
                           onChange={onChangeHandler}
                           checked={t.isDone}/>
                    {/*<span>{t.title}</span>*/}
                    <SpanNew value={t.title} changeTitle={(text) => {
                        props.changeTitle(props.todolistId, t.id, text)
                    }}/>
                    <button onClick={onClickHandler}>x</button>
                </div>
            })
            }
            </div>
            <div>
                <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                >
                    <Button

                        className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button className={props.filter === 'active' ? "active-filter" : ""}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button className={props.filter === 'completed' ? "active-filter" : ""}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>)
}
