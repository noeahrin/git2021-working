// Counter 컴포넌트
// state(상태)

import { useState } from "react";


// 화면에 뭔가 변경을 일으켜야함 
//-> 내부에서 처리할거다, state쓴다 || 외부에서 온다, prop


const Counter = () => {
  // const [state名, state변경함수名] = useState(초깃값);
  // prop: 화면에 렌더링결과에 영향을 미치는 변수, 외부에서 매개변수로 옴
  // state: 화면에 렝더링결과에 영향을 미치는 변수, 내부에서 선언함

  // state변수는 변경불가(immutable, 불변성)
  // ex)count = 1; 처럼 직접적인 변경 불가
  // setCount(count + 1); // state 변경함수로만 변경할 수 있음
  // 바로 밑에 const 를 let으로 하고 inclease에 count += 1; 해도 안됨

  // 더 정확한 표현은
  // state 변경함수로 state를 변경했을때만 컴포넌트를 업데이트함(다시그림)
  // state변경함수를 실행하면 state가 있는 컴포넌트가 모두 다시 그려짐
  // -> 실제로는 변동사항이 있는 부분만 다시 그림
  // 기존 virtual dom 객체와 변동된 virtual dom 객체를 비교함
  // 같으면 다시 그리지 않음

  const [count, setCount] = useState(0);  // 초기값 0으로 세팅

  const increase = () => {
    // state변경함수(변경할값)
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Counter</h2>
      <div>
        {/* button에 addEventListener("click", () =>{}) 같음 */}
        <button
          onClick={() => {
            // alert("클릭");
            increase();
          }}
        >
          COUNT
        </button>
        {/* <span>0 -> 1 안에 컨텐트가 뀐거</span> */}
        <span>{count}</span>
      </div>
    </div>
  );
};

export default Counter;