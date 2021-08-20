// Calculator 컴포넌트

import { useRef, useState } from "react";

// 1. 버튼을 클릭하면 prompt로 입력값을 두번 받음
// a = prompt, b = prompt

// 2. 그다음에 연산자를 prompt로 받음
// +, -, *, /

// 3. 입력값 두개에 대한 연산 결과를 화면 출력
// state를 사용해야함

// 예) 입력값1: 10
//     입력값2: 5
//     연산자: *
//     결과값: 50
//     <div>50</div>

const CalculatorRef = () => {
  const [result, setResult] = useState<string | number>();

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const calculate = () => {
    const First = inputRef1.current?.value;
    const operator = inputRef2.current?.value;
    const Second = inputRef3.current?.value;
    // 값 비우기
    inputRef1.current && (inputRef1.current.value = "");
    inputRef2.current && (inputRef2.current.value = "");
    inputRef3.current && (inputRef3.current.value = "");
    const numFirst = Number(First);
    const numSecond = Number(Second);
    setResult(eval(`${numFirst}${operator}${numSecond}`));
  };

  return (
    <div>
      <h2>CalculatorRef</h2>
      {/* 입력박스 3개, 첫번째숫자/두번째숫자/연산자 */}
      <div>
        <input type="text" ref={inputRef1} />
        <input type="text" ref={inputRef2} />
        <input type="text" ref={inputRef3} />
      </div>
      <div>
        <button
          onClick={() => {
            calculate();
          }}
        >
          CALCULATE
        </button>
      </div>
      <div>{result}</div>
    </div>
  );
};

export default CalculatorRef;