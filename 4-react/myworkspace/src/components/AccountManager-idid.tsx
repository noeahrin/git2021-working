// 계좌관리

////// 입력박스에는 입출금 금액 넣음   prompt로 떠야함

// 버튼: 입금버튼, 출금버튼
// 버튼 클릭시에 입금 금액 또는 출금 금액을 입력 받을 수 있음

// 목록: 입금, 출금액 목록을 ul > li로 표ㅣ한다
// 입금 금액은 -><li> 입금: 금액 (녹색) </li> 으로 표시
// 출금 금액은 -><li> 출금: -금액 (빨간색) </li>으로 표시

// 총엑: 잔액을 입금, 출금 버튼 우측에 표시한다


// 입력박스 입금 출금 잔액:_____  
//                          최근게 위로
// 입금: _____ (초록)
// 출금: _____ (빨강)


import { useState } from "react";
const ListItem = ({ key, name, num }: { key: number; name: string; num: number }) => {
  const color = num < 0 ? "red" : "green";
  return (
    <li key={key} style={{ color: color }}>
      {name}{num}
    </li>
  )
}

const AccountManager1 = () => {
  const [numbers, setResult] = useState<number[]>([0]);

  const Input = () => {
    const inputMoney = prompt("금액을 입력하세요", "");
    const num = Number(inputMoney);
    const sum = [num, ...numbers].reduce((a, b) => (a + b))
    setResult([num, ...numbers]);
    console.log(sum);
    console.log(numbers);
    console.log(numbers.reduce((a, b) => (a + b)));
  }

  const Output = () => {
    const inputMoney = prompt("금액을 입력하세요", "");
    const num = -Number(inputMoney);
    const sum = [num, ...numbers].reduce((a, b) => (a + b));
    setResult([num, ...numbers]);
    console.log(sum);
    console.log(numbers);
    console.log(numbers.reduce((a, b) => (a + b)));
  }


  return (
    <div>
      <h2>AccountManager1</h2>
      <div>
        <button onClick={() => {
          Input();
        }}
        >
          입금
        </button>
        <button onClick={() => {
          Output();
        }}
        >
          출금
        </button>
        {
          <span>
            잔액:{numbers.reduce((a, b) => (a + b))}
          </span>
        }
      </div>
      <ul>
        {
          numbers.map(
            (num, index) => (
              // 세부 컴포넌트로 분리하여 처리
              num < 0 ? (
                <ListItem key={index} name={`출금: `} num={num} />
              ) : (
                <ListItem key={index} name={`입금: `} num={num} />
              )
            )
          )
        }
      </ul>
    </div>

  )
};
export default AccountManager1;