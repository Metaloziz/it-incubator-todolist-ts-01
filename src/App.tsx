import React, {useState} from 'react';
import {ToDoList} from "./components/ToDoList";
import {v1} from "uuid";
import s from './App.module.css'
import {SupperInput} from "./components/SupperInput";

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
export type statePT = toDoListPT[]
export type toDoListPT = {
    id: string
    title: string
    filter: filterPT
}

const buttons = {
    all: 'All',
    completed: 'Completed',
    active: 'Active',
    added: 'Add',
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

    const addTask = (title: string, listID: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [listID]: [newTask, ...tasks[listID]]})
    }
    const removeTask = (listID: string, taskID: string) => {
        setTasks({...tasks, [listID]: tasks[listID].filter(l => l.id !== taskID)})
    }
    const changeTaskStatus = (taskID: string, listID: string) => {
        setTasks({...tasks, [listID]: tasks[listID].map(l => l.id === taskID ? {...l, isDone: !l.isDone} : l)})
    }
    const changeFilter = (filter: filterPT, listID: string) => {
        setState(state.map(l => l.id === listID ? {...l, filter: filter} : l))
    }
    const removeList = (listID: string) => {
        setState(state.filter(l => l.id !== listID))
    }

    const addNewList = (title: string, listID: string) => {
        let newList: toDoListPT = {id: listID, title: title, filter: 'All'}
        setState([...state, newList])
        setTasks({[listID]: [], ...tasks,})
    }

    const changeTitleList = (newTitle: string, listID: string) => {
        state.map(l => l.id === listID ? l.title = newTitle : l)
        setState([...state])
    }
    const changeTitleTask = (newTitle: string, listID: string, taskID: string) => {
        tasks[listID].map(l => l.id === taskID ? l.title = newTitle : l)
        setTasks({...tasks})
    }

    return (
        <div className={s.main}>
            <SupperInput listID={v1()} addItem={addNewList}/>
            {state.map(l => {

                let copyTasks = tasks[l.id]

                switch (l.filter) {
                    case 'Completed':
                        copyTasks = copyTasks.filter(l => l.isDone)
                        break
                    case 'Active':
                        copyTasks = copyTasks.filter(l => !l.isDone)
                }

                return (<ToDoList listID={l.id}
                                  key={l.id}
                                  title={l.title}
                                  tasks={copyTasks}
                                  addTask={addTask}
                                  removeTask={removeTask}
                                  removeList={removeList}
                                  filterTasks={changeFilter}
                                  filter={l.filter}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTitleList={changeTitleList}
                                  changeTitleTask={changeTitleTask}
                                  buttons={buttons}
                    />
                )
            })}
        </div>
    );
}

export default App;
