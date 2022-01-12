import {TasksStateType} from '../App';
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionsType =
    RemoveTaskListACPT
    | AddTaskListACPT
    | changeTaskStatusACPT
    | changeTaskTitleACPT
    | AddTodolistActionType
    | RemoveTodolistActionType


type AddTaskListACPT = ReturnType<typeof addTaskAC>
type RemoveTaskListACPT = ReturnType<typeof removeTaskAC>
type changeTaskStatusACPT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACPT = ReturnType<typeof changeTaskTitleAC>

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const CHANGE_STATUS = 'CHANGE_STATUS'
const CHANGE_TASKS_TITLE = 'CHANGE_TASKS_TITLE'

export const addTaskAC = (listID: string, title: string) => ({type: ADD_TASK, listID, title} as const)
export const removeTaskAC = (listID: string, taskID: string) => ({type: REMOVE_TASK, listID, taskID} as const)
export const changeTaskStatusAC = (listID: string, taskID: string) => ({type: CHANGE_STATUS, listID, taskID} as const)
export const changeTaskTitleAC = (listID: string, taskID: string, title: string) => ({
    type: CHANGE_TASKS_TITLE,
    listID,
    taskID,
    title
} as const)

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            let newTask: TaskType = {id: '10', title: action.title, isDone: false}
            return {...state, [action.listID]: [newTask, ...state[action.listID]]}
        case REMOVE_TASK:
            return {...state, [action.listID]: state[action.listID].filter(t => t.id !== action.taskID)}
        case CHANGE_STATUS:
            return {
                ...state, [action.listID]: state[action.listID]
                    .map(l => l.id === action.taskID ? {...l, isDone: !l.isDone} : l)
            }
        case CHANGE_TASKS_TITLE:
            return {
                ...state, [action.listID]: state[action.listID]
                    .map(l => l.id === action.taskID ? {...l, title: action.title} : l)
            }
        case "ADD-TODOLIST":
            return {...state, [action.id]: []}
        case "REMOVE-TODOLIST":
            let copy = {...state}
            delete copy[action.id]
            return copy
        default:
            console.log("I don't understand this type")
            return state
    }
}


