// Calculator 컴포넌트

// 1. 버튼을 클릭하면 prompt로 입력값을 두 번 받음
// a = prompt, b = prompt

// 2. 그다음에 연산자를 prompt로 받음
// +, -, *, /

// 3. 입력값 두개에 대한 연산 결과를 화면에 출력
// state를 사용해야함

// 예) 입력값1: 10
//     입력값2: 5
//     연산자: *
//     결과값: 50
//     <div>50</div>
import { strict } from "assert";
import { useState } from "react";

const Calculator = () => {
  let [calculate, setCalculate] = useState/*<number | null>*/(0);
  const calculation = () => {
    const a = prompt("첫 번째 숫자를 입력하세요(숫자만)", "");
    const b = prompt("두 번째 숫자를 입력하세요(숫자만)", "");
    const c = prompt("연산자(+, -, *, /)를 입력하세요", "");
    // if (c == "+") {
    //   calculate = Number(a) + Number(b);
    // } else if (c == "-") {
    //   calculate = Number(a) - Number(b);
    // } else if (c == "*") {
    //   calculate = Number(a) * Number(b);
    // } else if (c == "/") {
    //   calculate = Number(a) / Number(b);
    // }
    // setCalculate(calculate);

    console.log(`${a}${c}${b}`); // abc
    // eval(문자열)
    // 문자열이 자바스크립트코드로 실행할 수 있으면 실행
    // eslint-disable-next-line
    const code = `alert(${a}${c}${b})`
    setCalculate(eval(`${a}${c}${b}`));

    // state 값에 변동이 없으면 컴포넌트를 업데이트하지 않음(새로 그리지 않음) 
    // 예) 기존 result == 20
    //     변동 result == 20
  };


  return (
    <div>
      <div>
        <h2>Calculator</h2>
        <button
          onClick={() => {
            calculation();
          }}
        >
          CALCULATE
        </button>
        <div>{calculate}</div>
      </div>
    </div>
  );
};

export default Calculator;