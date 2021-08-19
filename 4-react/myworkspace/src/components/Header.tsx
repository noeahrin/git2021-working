// 컴포넌트 정의
// react에서 component = JSX를 반환하는 함수
// <></>: Fragment(조각)
// 어떤 태그형식으로 변환되지 않음, 빈 태그
// 즉 굳이 div라던지 어떤 태그로 만들고 싶지 않을때

// 컴포넌트에 속성으로 color, title을 받을 것임
// 컴포넌트의 속성(prop 프롭): 함수의 매개변수처럼 외부에서 넘겨받는 변수

// 어떤 속성을 갖는지 지정해줌
interface HeaderProp {
  // color: string
  // union type(유니언 타입): 값의 집합, App.tsx에서 이것 이외의 값을 못씀
  color: "green" | "red" | "blue";
  title: string;
}



// 방법 1
// const Header = ({ color, title }: HeaderProp) => {
// 방법 2
// const 함수명 : React.FC<속성타입> = ({속성1, 속성2}) => {
// 
// }
const Header: React.FC<HeaderProp> = ({ color, title }) => {
  // 태그가 아니라 자바스크립트 객체임
  return <h1 style={{ color: color }}>{title}</h1>;
  // return <></><div></div>;  불가능 즉 여러개의 부모 엘리먼트 반환 못함
};

// 컴포넌트 내보내기
export default Header;