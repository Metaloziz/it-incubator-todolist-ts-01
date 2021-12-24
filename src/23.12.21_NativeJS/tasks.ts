export const sum = (state: number, num: number) => {
    return state + num
}
export const sub = (state: number, num: number) => {
    return state - num
}
export const mul = (state: number, num: number) => {
    return state * num
}
export const div = (state: number, num: number) => {
    return Math.round(100 * state / num) / 100
}

type actionPT = sumACPT | subACPT | mulACPT | divACPT

type sumACPT = ReturnType<typeof sumAC>
type subACPT = ReturnType<typeof subAC>
type mulACPT = ReturnType<typeof mulAC>
type divACPT = ReturnType<typeof divAC>

const SUM = "SUM"
const SUB = "SUB"
const MUL = "MUL"
const DIV = "DIV"

export const sumAC = (secNumber: number) => ({type: SUM, secNumber} as const)
export const subAC = (secNumber: number) => ({type: SUB, secNumber} as const)
export const mulAC = (secNumber: number) => ({type: MUL, secNumber} as const)
export const divAC = (secNumber: number) => ({type: DIV, secNumber} as const)

export const newReducer = (state: number, action: actionPT): number => {

    switch (action.type) {
        case SUM:
            return state + action.secNumber
        case SUB:
            return state - action.secNumber
        case MUL:
            return state * action.secNumber
        case DIV:
            return Math.round(100 * state / action.secNumber) / 100
        default:
            return state
    }
}