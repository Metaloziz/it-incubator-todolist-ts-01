import React, {useState} from 'react';

import {ToDoList} from "./components/ToDoList";
import {v1} from "uuid";
import s from './App.module.css'

export type filterPT = 'all' | 'completed' | 'active'

export type tasksPT = taskPT[]

export type taskPT = {
    id: string
    title: string
    isDone: boolean
}


function App() {

    const state = [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'Food', filter: 'all'}
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
    const [filter, setFilter] = useState<filterPT>("all")

    const remuveTask = (taskID: string) => {
        const copyTasks = [...tasks]
        setTasks(copyTasks.filter(l => l.id !== taskID))
    }

    let copyTasks = tasks
    // const filterTasks = (filter: filterPT) => {
    //     setTasks(() => {
                switch (filter) {
                    case 'completed':
                        copyTasks = copyTasks.filter(l => l.isDone)
                        break
                    case 'active':
                        copyTasks=  copyTasks.filter(l => !l.isDone)
                    // case 'all':
                    //     return copyTasks
                 }
    //         }
    //     )
    // }
    const addTask = (title: string) => {
        const copyTasks = [...tasks1]
    }

    return (
        <div className={s.main}>
            <ToDoList title={'What to learn'}
                      tasks={copyTasks}
                      remuveTask={remuveTask}
                      filterTasks={setFilter}/>
            {/*<ToDoList title={'Food'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
