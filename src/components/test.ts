export {}

export let id1 = 'list_One'
export let id2 = 'list_Two'

type objectPropsType = {
    [key: string]: string
}


let object: objectPropsType = {
    [id1]: 'example',
    [id2]: 'example',
    'cccccccccc': 'aaaaaaaaaaa',
    'test': 'eeee',
    // 'test': 'eeee',
    [id1]: '',
    [id1]: ''
}

console.log(id1 === id2)
console.log(id1)
console.log(id2)