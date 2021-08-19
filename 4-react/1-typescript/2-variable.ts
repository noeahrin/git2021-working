// 변수 선언
// let/const 변수명: 타입
let str: string;
let num: number;

str = "John";
// str = 1; // type error

num = 1;
// num = "John"; // type error

let a = 5;
let b = 10;
let c = "*";
let d: number;

d = a + Number(c) + b;
console.log(d);