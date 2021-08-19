// Button 컴포넌트 생성
// <button ... 반환하는 컴포넌트
// 속성: 
// color: 글자색("white", "black")
// backgroundColor: 배경색("red", "green", "blue")
// text: 버튼의 텍스트(대문자로 표시)

import { Variant } from "@testing-library/react";

// interface ButtonProp {
//   color: "white" | "black";
//   backgroundColor: "red" | "green" | "blue";
//   text: string;
// }

// const Button: React.FC<ButtonProp> = ({ color, backgroundColor, text }) => {

//   return <button style={{
//     color: color,
//     backgroundColor: backgroundColor
//   }}>{text.toUpperCase()}</button>;
// };

// variant: 버튼 스타일 타입

interface ButtonProp {
  // color: "white" | "black";
  // backgroundColor: "red" | "green" | "blue";
  variant: "primary" | "secondary" | "warning";
  text: string;
}

const Button: React.FC<ButtonProp> = ({ variant, text }) => {
  let bgColor = "blue";
  let color = "black";

  switch (variant) {
    case "primary":
      bgColor = "blue";
      color = "white";
      break;
    case "secondary":
      bgColor = "gray";
      color = "white";
      break;
    case "warning":
      bgColor = "orange";
      color = "black";
      break;
  }

  return (
    <button
      style={{
        color: color,
        backgroundColor: bgColor,
      }}
    >
      {text.toUpperCase()}
    </button>
  );
};

export default Button;