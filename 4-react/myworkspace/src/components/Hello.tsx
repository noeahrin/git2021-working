import { useRef, useState } from "react";

const Hello = () => {
  // useState<state타입>(초깃값)
  // state타입을 union 타입으로 설정 가능
  const [userName, setUserName] = useState<string | undefined>("");


  // 참조객체 생성
  // useRef<참조객체타입>(초기값);

  // JSX Element를 참조하는 객체라면
  // JSX Element로 렌더링 되는 HTML 요소의 타입을 넣어야함, 기본값은 null
  const inputRef = useRef<HTMLInputElement>(null);

  const hello = () => {
    // JSX Element를 참조하는 객체일 때
    // 참조객체.current는 현제 렌더링된 HTML 요소
    // console.log(inputRef.current); // <input type="text">
    // inputRef.current가 null/undefined가 아니면 value속성을 참조해라
    // console.log(inputRef.current?.value); // <인풋>에 입력하는 값

    // current 객체가 있으면 == 렌더링된 HTML요소가 있으면
    // current.value == 입력박스의 입력값

    // current 객체가 없으면 == 렌더링된 HTML요소가 없음(렌더링 되기 전, null   current가 null)
    // current?.value == undefiend
    const name = inputRef.current?.value;
    if (typeof name)
      setUserName(name); // undefined 될 때 안되는데 위에 usestate<string | undefined> 추가해서 됨



    setUserName(inputRef.current?.value);

    // 값 비워주기
    inputRef.current && (inputRef.current.value = "");
  };

  // console.log(inputRef.current); // null,
  // console.log(inputRef.current?.value); // undefined, current가 null이면 undefined를 반환

  return (
    <div>
      <h2>Hello</h2>
      <input type="text" ref={inputRef} />
      <button onClick={() => {
        hello();
      }}
      >
        인사
      </button>
      {userName && <div> 안녕하세요, [{userName}]님 !</div>}
    </div>
  );
};
export default Hello;