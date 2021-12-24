import {div, divAC, mul, mulAC, newReducer, sub, subAC, sum, sumAC} from "./tasks";


test('test1', () => {

    let num1 = 10
    let num2 = 12

    let secondResult1 = sum(num1, num2)
    let secondResult2 = sub(num1, num2)
    let secondResult3 = mul(num1, num2)
    let secondResult4 = div(num1, num2)

    let action1 = sumAC(num2)       // {type: SUM, secNumber: secNumber}
    let action2 = subAC(num2)       // {type: SUB, secNumber: secNumber}
    let action3 = mulAC(num2)       // {type: MUL, secNumber: secNumber}
    let action4 = divAC(num2)       // {type: DIV, secNumber: secNumber}

    let result1 = newReducer(num1, action1) // newReducer = (state: number, action: actionPT) {
    let result2 = newReducer(num1, action2)
    let result3 = newReducer(num1, action3)
    let result4 = newReducer(num1, action4)

    expect(result1).toBe(secondResult1)
    expect(result2).toBe(secondResult2)
    expect(result3).toBe(secondResult3)
    expect(result4).toBe(secondResult4)

})