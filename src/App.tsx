import React, {useState} from 'react';
import TodoList from "./TodoList";
import {v1} from "uuid";
import './App.css';
import AddItemForm from "./AddItemForm";

type toDoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type taskStateType = { [key: string]: TaskType[] }
export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todolists, setTodoLists] = useState<Array<toDoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<taskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "FISH", isDone: false},
        ]
    })

    const addTask = (newTaskTitle: string, todoListID: string) => {

        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const copyState = {...tasks}
        copyState[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyState)

    }
    const removeTask = (taskID: string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyState)

        // const upDatedTasks = tasks.filter(task => task.id !== taskID)
        // setTasks(upDatedTasks)
    }
    const addTodoList = (title: string) => {

        const newToDoList: toDoListType = {
            id: v1(),
            title: title,
            filter: "active"
        }
        setTodoLists([...todolists, newToDoList])
        setTasks({...tasks, [newToDoList.id]: []})

    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        const updateToDoList = todolists.map(x => x.id === todoListID ? {...x, filter: filter} : x)
        setTodoLists(updateToDoList)
    }
    const removeToDoList = (todoListID: string) => {
        setTodoLists(todolists.filter(l => l.id !== todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].map(x => x.id === taskID ? {...x, isDone: isDone} : x)
        setTasks(copyState)
        // const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        // setTasks(updatedTasks)
    }
    //------------------------------------

    const changeToDoListTitle = (title: string, todoListID: string) => {
        const updateToDoList = todolists.map(x => x.id === todoListID ? {...x, title: title} : x)
        setTodoLists(updateToDoList)
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].map(x => x.id === taskID ? {...x, title: title} : x)
        setTasks(copyState)
    }
    const todoListComponents = todolists.map(o => {
        let tasksForRender = tasks[o.id]
        //--------------------2-----------------------------------------/
        switch (o.filter) {
            case "active":
                tasksForRender = tasksForRender.filter(t => !t.isDone)
                break
            case "completed":
                tasksForRender = tasksForRender.filter(t => t.isDone)
                break
        }
        //----------------2-------------------------------------------
        // if (o.filter === "active") {
        //     tasksForRender = tasksForRender.filter(t => !t.isDone)
        // }
        // if (o.filter === "completed") {
        //     tasksForRender = tasksForRender.filter(t => t.isDone)
        // }

        return (
            <TodoList
                key={o.id}
                id={o.id}
                title={o.title}
                tasks={tasksForRender}
                filter={o.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                remove={removeToDoList}
                changeTaskTitle={changeTaskTitle}
                changeToDoListTitle={changeToDoListTitle}
            />
        )
    })


    //UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/> {/*second variant use component*/}
            {todoListComponents}
        </div>
    );
}

export default App;
