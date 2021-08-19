// interface 객체 구조의 형식\
// interface 타입명 {
//  속성명: 타입;,
//  속성명: 타입;
// }
interface User {
  firstname: string;
  lastname?: string; // 속성명?, optional(필수값이 아닌) 속성
  phone?: String;
}

function printName(obj: User) {
  {
    // 삭제한 속성 반복문에서 안나옴
    Object.keys(obj).forEach((key) => {
      console.log(key);
    });
  }
  for (let prop in obj) {
    console.log(prop);
  }
  console.log(obj.firstname + " " + obj.lastname);
}


// 타입명[]
// number[], string[], User[]
function printNames(arr: User[]) {
  for (let obj of arr) {
    console.log(obj.firstname + " " + obj.lastname);
  }
}

const user: User = {
  firstname: "John",
  // lastname: "Smith",
};

// 속성 추가 불가능
// user.phone - "12345678"

// optional 필드는 delete 가느ㅇ함
delete user.firstname;

const users: User[] = [
  { firstname: "John", lastname: "Smith" },
  { firstname: "Gildong", lastname: "Hong" },
];

printName(user);
printNames(users);