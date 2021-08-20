
// JSX: Javascript 기반의 HTML 태그 형식
// 각각의 태그처럼 보이는 element들은 javascript 객체임
// 일반적인 html 태그 표기법과 다름
// //////jsx 구글검색    jsx는 객체를 표현합니다 에서 복붙

// JSX Element
// const element = (
//   <h1 className="greeting">
//     Hello, world!
//   </h1>
// );

// 실제 컴파일되는 결과
// const element = React.createElement(
//   'h1', // 태그 종류
//   {className: 'greeting'}, // 속성
//   'Hello, world!' // 컨텐트
// );

// document.createElement("div")
// 실제 DOM을 생성함

// React.createElement("div", ...)
// 가상 DOM을 생성함
// 가상 DOM == javascript 객체
// 내부적으로 가상 DOM tree를 관리함
//////// virtual dom tree 구글검색

// https://medium.com/sjk5766/virtual-dom에-대해-7222d752ee65
/////// 가상 DOM은 객체에다 가상의 dom tree 구조가 추가되고 안에걸 다 읽어서 html로 그려지는거
/////// React는 어떻게 되냐면 
// 랜더링(rendering): 화면에 그리기
// 가상DOM을 생성하고 랜더링 시점(event loop)에 가상 DOM HTML DOM으로 그림

// 일반 DOM
// DOM을 조작할 떄마다 rendering 함, 성능 저하

// 가상 DOM
// 렌더링 주기에 따라서 변동사항만 //체크해서// 렌더링 함, 성능 향상
/////// 네이버react 검색   네이버 React 적용가이드- 네이버 메일 모바일웹 적용기
/////// javajsp -> React
// 그래서 일반적인 자바스크립트 개발 방법과 완전히 다름
// ------------------------------------------------------------------
// react 관련 자료는 2020년 이후 것으로만 봐야함, 2019년 이후까진 괜찮은데 그 전꺼랑 지금은 다름

// Function Component
// 대문자로 시작함
// JSX Element를 반환함
// JS함수인데, JSX Element를 반환함 == Component
// 리액트에서 컴포넌트라는 것은 JSX Element를 렌더링하는 함수 라고 생각하면 됨
// /src/index.tsx 에서 DOM에서 렌더링

// 이건 함수임 근데 함수명이 react에서는 대문자로 시작함(App 아래 이것처럼)
//////// 밑에 태그들은 html 태그가 아님


import Header from "./components/Header";
import Button from "./components/Button";
import Counter from "./components/Counter";
import Calculator from "./components/Calculator";
import Generator from "./components/Generator";
import AccountManager from "./components/AccountManager";
import Hello from "./components/Hello";
import CalculatorRef from "./components/CalculatorRef";
import AccountManagerRef from "./components/AccountManagerRef";

// React == 컴포넌트 개발 라이브러리
function App() {
  return (
    // main container
    <div style={{ width: "500px", margin: "0 auto" }}>
      {/* JSX 내부에서 주석 달기 */}
      {/* 재사용하지 않는 컴포넌트 */}
      {/* <h1 style={{ color: "red" }}>Hello React with Typescript !</h1> */}

      {/* 속성값을 변경하여 재사용하는 컴포넌트 */}
      {/* Component의 속성(prop)을 넘김 */}
      {/* 속성명={속성값} */}
      <Header color={"red"} title={"React"} />
      <Header color={"green"} title={"Typescript"} />
      <Header color={"blue"} title={"Function Component"} />

      {/* <Button color={"black"} backgroundColor={"red"} text={"Delete"} />
      <Button color={"black"} backgroundColor={"green"} text={"Done"} /> */}
      <Button variant={"primary"} text={"Add"} />
      <Button variant={"secondary"} text={"Delete"} />
      <Button variant={"warning"} text={"Delete"} />

      <Counter />
      <Calculator />
      <Generator />
      <AccountManager />
      <Hello />
      <CalculatorRef />
      <AccountManagerRef />
    </div>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
export default App;



