import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type statePT = typeof tasks

type actionPT = addACPT | removeACPT

type addACPT = ReturnType<typeof addAC>
type removeACPT = ReturnType<typeof removeAC>

const ADD_TASK = "ADD_TASK"
const REMOVE_TASK = "REMOVE_TASK"

const addAC = (newTitle: string) => ({type: ADD_TASK, newTitle} as const)
const removeAC = (id: string) => ({type: ADD_TASK, id} as const)


let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
]);

function App() {

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }


    const newReducer = (state: statePT = tasks, action: actionPT) => {
        switch (action.type) {
            case ADD_TASK:
                let task = {id: v1(), title:'test', isDone: false};
                let newTasks = [task, ...tasks];
                setTasks(newTasks)

        }

    }


    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
