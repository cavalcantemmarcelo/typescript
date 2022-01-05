// Boolean 

let isSet: boolean = false;
isSet = true;

// Number
let decimal: number = 6;
let hex: number = 0xff0000;
let binary: number = 0b01010;

// String
let color: string = 'blue'
color = 'red';

// Array 
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// Tuple 
let user: [string, number];
user = ["Marcelo", 1]

// Alias
type User = {
    name: string;
    age: number;
    id: number;
    city: string
}

let user1 : User;

type pet = 'dog' | 'cat' | 'fish';

let pet: pet = 'dog';
let pet2: pet = 'fish';

function sum(n1: number | string, n2: number | string){

    let v1 = typeof n1 === 'string' ? +n1 : n1;
    let v2 = typeof n2 === 'string' ? +n2 : n2;

    console.log(v1 + v2);
    
}

sum(20, '20'); //ok
sum(50, "50"); //ok
sum("10", "10"); // ok