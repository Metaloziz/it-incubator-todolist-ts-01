import React, {useState} from 'react';

import {ToDoList} from "./components/ToDoList";
import {v1} from "uuid";
import s from './App.module.css'

export type filterPT = 'All' | 'Completed' | 'Active'

export type tasksPT = taskPT[]

export type taskPT = {
    id: string
    title: string
    isDone: boolean
}

export type buttonsPT = typeof buttons

type statePT = toDolistPT[]

export type toDolistPT = {
    id: string
    title: string
    filter: filterPT
}


const buttons = {
    all: 'All',
    completed: 'Completed',
    active: 'Active',
    added: 'Added',
    x: 'x'
} as const


function App() {

    const toDoLists: statePT = [
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'Food', filter: 'All'}
    ]

    const tasks1: tasksPT = [
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TS', isDone: true},
        {id: v1(), title: 'NodeJS', isDone: false},
        {id: v1(), title: 'AI', isDone: true},
        {id: v1(), title: 'Skynet', isDone: false}
    ]
    const tasks2: tasksPT = [
        {id: v1(), title: 'Apple', isDone: false},
        {id: v1(), title: 'Pear', isDone: false},
        {id: v1(), title: 'Melon', isDone: false},
        {id: v1(), title: 'Orange', isDone: false}
    ]

    const [tasks, setTasks] = useState<tasksPT>(tasks1)
    const [state, setState] = useState<statePT>(toDoLists)


    const removeTask = (taskID: string) => {
        const copyTasks = [...tasks]
        setTasks(copyTasks.filter(l => l.id !== taskID))
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        const copyTasks = [newTask, ...tasks]
        setTasks(copyTasks)
    }
    const changeTaskStatus = (taskID: string) => {
        let copyTasks: tasksPT = [...tasks]
        copyTasks = tasks.map(l => l.id === taskID ? {...l, isDone: !l.isDone} : l)
        setTasks(copyTasks)
    }
    const changeFilter = (filter: filterPT, idToDoList: string) => {
        console.log('gg')
        debugger
        let copyToDoLists = [...toDoLists]
        copyToDoLists.map(l => l.id === idToDoList ? {...l, filter: filter} : l)
    }


    return (
        <div className={s.main}>
            {state.map(l => {

                let copyTasks = tasks
                debugger
                switch (l.filter) {
                    case 'Completed':
                        copyTasks = tasks.filter(l => l.isDone)
                        break
                    case 'Active':
                        copyTasks = tasks.filter(l => !l.isDone)
                        break
                }

                return (<ToDoList toDoListID={l.id}
                                  key={l.id}
                                  title={l.title}
                                  tasks={copyTasks}
                                  removeTask={removeTask}
                                  filterTasks={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  buttons={buttons}
                                  filter={l.filter}/>
                )
            })}
        </div>
    );
}

export default App;
