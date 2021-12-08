import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type taskType = {
    id: string
    title: string
    isDone: boolean
}
type tasksStateType = {
    [key: string]: taskType[]
}

function App() {

    const todoListID_1: string = v1()
    const todoListID_2: string = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListID_1, title: 'language', filter: 'all'},
        {id: todoListID_2, title: 'store', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<tasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Road", isDone: true},
            {id: v1(), title: "Auto", isDone: true},
            {id: v1(), title: "Guitar", isDone: false},
        ]
    });

    function changeFilter(filter: FilterValuesType, todoListID: string) {
        let updateToDolist = todoLists.map(t => t.id === todoListID ? {...t, filter} : t)
        setTodoLists(updateToDolist);
    }

    function removeTask(taskID: string, todoListID: string) {
        const copyTasks = {...tasks} // need create copy for useState, because it is blind
        copyTasks[todoListID] = copyTasks[todoListID].filter(t => t.id != taskID);
        setTasks(copyTasks);
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        // copyTasks[todoListID].push(newTask)
        setTasks(copyTasks);
    }

    const changeStatus = (CurrentId: string, isDone: boolean, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = copyTasks[todoListID].map(t => t.id === CurrentId ? {...t, isDone} : t)
        setTasks(copyTasks)
    }




    const renderTodoLists = todoLists.map(t => {

        let tasksForTodolist = tasks[t.id];

        if (t.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (t.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }


        return (<Todolist
            key ={t.id}
            id ={t.id}
            title={t.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={t.filter}/>)
    })

    return (
        <div className="App">
            {renderTodoLists}
        </div>
    );
}

export default App;
