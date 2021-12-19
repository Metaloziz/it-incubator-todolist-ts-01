import React, {useState} from 'react';

import {ToDoList} from "./components/ToDoList";
import {v1} from "uuid";
import s from './App.module.css'

export type filterPT = 'All' | 'Completed' | 'Active'

export type tasksPT = {
    [key: string]: taskPT[]
}

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

    const list1 = v1()
    const list2 = v1()

    const [state, setState] = useState<statePT>([
        {id: list1, title: 'What to learn', filter: 'All'},
        {id: list2, title: 'Food', filter: 'All'}
    ])


    const [tasks, setTasks] = useState<tasksPT>({
        [list1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'TS', isDone: true},
            {id: v1(), title: 'NodeJS', isDone: false},
            {id: v1(), title: 'AI', isDone: true},
            {id: v1(), title: 'Skynet', isDone: false}
        ],
        [list2]: [
            {id: v1(), title: 'Apple', isDone: false},
            {id: v1(), title: 'Pear', isDone: false},
            {id: v1(), title: 'Melon', isDone: false},
            {id: v1(), title: 'Orange', isDone: false}
        ]
    })


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
        let copyTasks = [...tasks]
        copyTasks = tasks.map(l => l.id === taskID ? {...l, isDone: !l.isDone} : l)
        setTasks(copyTasks)
    }

    const changeFilter = (filter: filterPT, idToDoList: string) => {
        let changeToDo = state.find(l => l.id === idToDoList)
        if (changeToDo) {
            changeToDo.filter = filter
        }
        setState([...state])
    }

    return (
        <div className={s.main}>
            {state.map(l => {

                let copyTasks = tasks

                switch (l.filter) {
                    case 'Completed':
                        copyTasks = copyTasks.filter(l => l.isDone)
                        break
                    case 'Active':
                        copyTasks = copyTasks.filter(l => !l.isDone)
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
