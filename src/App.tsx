import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type tasksType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<tasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todolistID: string) {
        console.log('haha')
        let copyTasks = {...tasks}
        copyTasks[todolistID] = copyTasks[todolistID].filter(t => t.id !== id)
        setTasks(copyTasks)

        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)});

        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(title: string, todolistID: string) {

        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {


        let copy = {...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone} : m)}
        console.log(copy)
        setTasks(copy);

        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
    }


    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
        // setFilter(value);
    }


    return (
        <div className="App">

            {todolists.map(m => {

                let tasksForTodolist = tasks[m.id]

                if (m.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }

                return (
                    <Todolist
                        todolistID={m.id}
                        key={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
