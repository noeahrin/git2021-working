// any 타입
// 웬만하면 권장하지 않음
// 동적 타입 필요할때만 사용
// 뭔가 필요하다면 4번의 interface를 쓰는게 나음
const obj: any = {};
obj.name = "hong";
obj["phone"] = "01012345678";
delete obj.name;
console.log(obj);

// 배열
const arr: any[] = [];
arr.push({ name: "hong", phone: "01012345678" });
// 자동완성이 안뜸
// arr[0].
console.log(arr);

// private 변수
// any타입은 let 선언만 가능, const 불가
let var1: any;
var1 = "hong";
var1 = 123;
console.log(var1);