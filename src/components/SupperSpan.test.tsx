import {v1} from "uuid";
import React from "react";

let idName = v1()
let titleOld = "My_Title"


let idValue = '1'
let title = 'title'

let cahngeTitleCB = (value: string)=>{
    title = value
}




test("test SupperSpan", ()=>{


    // return <SupperSpan id={idValue} title={title} changeTitle={cahngeTitleCB}/>;

    expect(title).toBe('title')
})
