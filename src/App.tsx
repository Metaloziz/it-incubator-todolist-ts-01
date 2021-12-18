import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn today', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'Java', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: true},
            {id: v1(), title: 'Chips', isDone: false},
            {id: v1(), title: 'Some milk', isDone: false},
            {id: v1(), title: 'Vine', isDone: false}
        ]
    })


    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    function addTask(todolistId: string, title: string) {
        debugger
        let newtask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newtask, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    //-------------------------------------
    const addNewItem = (title: string) => {
        debugger
        let todolistIdNew = v1()
        let newItem: TodolistType = {id: todolistIdNew, title: title, filter: 'all'};
        setTodolists([newItem, ...todolists])
        setTasks({...tasks, [todolistIdNew]: []})
    }

    return (
        <div className="App">
            <AddItemForm addTask={addNewItem}/>
            {todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                        />
                    )
                }
            )
            }
        </div>
    );
}

export default App;
