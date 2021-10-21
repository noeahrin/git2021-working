import { useEffect, useRef, useState } from "react";
import produce from "immer";
import { createNoSubstitutionTemplateLiteral } from "typescript";

// contact 1건에 대한 타입
interface ContactItemState {
  id: number;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  createdTime?: number;
  isEdit?: boolean;
}

// 서버로부터 받아오는 데이터 1건에 대한 타입
interface ContactItemResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdTime: number;
}




const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Contact = () => {
  // contact 여러건에 대한 state
  const [contactList, setContactList] = useState<ContactItemState[]>([
    // { id: 2, name: "Jhon", phone: "010-1234-5678", email: "John@gmail.com" },
    // { id: 1, name: "Smith", phone: "010-1111-2222", email: "Smith@gmail.com" },
  ]);

  // 데이터 로딩처리 여부를 표시
  const [isLoading, setLoading] = useState<boolean>(true);


  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);


  // useEffect(이펙트를처리할함수, [의존변수])
  // 의존변수의 값/참조가 바뀔때마나 함수가 처리됨
  // ex) props가 바뀌거나 state가 바뀔때 추가적인 처리를 함.

  // [] 의존변수목록이 빈 배열 -> 컴포넌트 렌더링되고 마운팅된후에 시점에 처리가됨
  useEffect(() => {
    // 의존변수가 바뀔 때 처리되는 코드를 작성
    // [] -> 컴포넌트 로딩 후에 바로 처리되는 코드
    console.log("--1. mounted--");
    // 백엔드에서 데이터를 받아올 것임
    // ES6 style로 Promise 기법을 이용해서 데이터를 조회해옴
    fetch("http://localhost:8080/contacts")
      // fetch 함수를 실행하고 네트워크 통신이 완료되면 then에 있는 함수(callback)를 실행함
      // then에 있는 callback 함수의 매개변수로 처리 결과를 넘겨줌
      // body가 json이면 js object(array)로 변환
      .then((res) => res.json())
      // 응답데이터를 js object(array)로 변환이 완료되면 다음 then에 있는 함수(callback)을 실행함
      // then에 있는 callback 함수의 매개변수로 변환된 결과를 넘겨줌
      // **서버에서 데이터를 받아오는 구조에 대한 interface를 별도로 정의하는 것이 좋음
      .then((data: ContactItemResponse[]) => {
        console.log("--2. fetch completed--");
        console.log(data);

        // 서버로부터 받은 데이터를 state 객체로 변환함
        const contacts = data.map((item) => ({
          id: item.id,
          name: item.name,
          phone: item.phone,
          email: item.email,
          createdTime: item.createdTime,
        })) as ContactItemState[];

        setLoading(false); // 로딩중 여부 state 업데이트
        setContactList(contacts); // todo state 업데이트

        // 로딩중 표시까지
        // setTimeout(() => {
        //   setLoading(false); // 로딩중 여부 state 업데이트
        //   setTodoList(todos); // todo state 업데이트
        // }, 300);
      });

    console.log("--3. complete--");
  }, []);



  const add = () => {
    if (nameInputRef.current?.value && phoneInputRef.current?.value && emailInputRef.current?.value) {
      const contact: ContactItemState = {
        id: contactList.length > 0 ? contactList[0].id + 1 : 1,
        name: nameInputRef.current?.value,
        phone: phoneInputRef.current?.value,
        email: emailInputRef.current?.value,
      };

      setContactList(
        produce((state) => {
          state.unshift(contact);
        })
      );
      formRef.current?.reset();
    };
  }

  const del = (id: number, index: number) => {
    setContactList(
      produce((state) => {
        state.splice(index, 1);
        // console.log(contactList[0].id);
        // 삭제후 id 재정렬
        state.map((item, index) => (
          item.id = contactList[0].id - index - 1
        ))
      })
    );
  };

  const edit = (id: number, mod: boolean) => {
    setContactList(
      produce((state) => {
        // 해당 id값에 해당하는 요소를 찾음
        const item = state.find((item) => item.id === id);
        if (item) {
          item.isEdit = mod;
        }
      })
    );
  };

  const save = (id: number, index: number) => {

    // item index와 input index가 일치하지 않아서

    // 방법 1
    // item index와 tr index가 같아서 tr 안에서 input을 찾아야함
    // tr이 thead tbody tfoot에 총 3개 있음
    const inputName = tableRef.current?.querySelectorAll("tr")[index + 1].querySelectorAll("input")[0];
    const inputPhone = tableRef.current?.querySelectorAll("tr")[index + 1].querySelectorAll("input")[1];
    const inputEmail = tableRef.current?.querySelectorAll("tr")[index + 1].querySelectorAll("input")[2];
    console.log(tableRef.current?.querySelectorAll('tr').length);
    // 방법 2
    // 만약에 input = querySelector("input")이라면 input이 나타내는건 input인데 span>input 이런거라면 element로
    // 표시되기에 뒤에 as HTMLInputElement 써줘야함
    // td에서 input 찾음
    // const inputName = tableRef.current?.querySelectorAll("td")[6 * index + 1].querySelector("input");
    // const inputPhone = tableRef.current?.querySelectorAll("td")[6 * index + 2].querySelector("input");
    // const inputEmail = tableRef.current?.querySelectorAll("td")[6 * index + 3].querySelector("input");
    // console.log(index);
    // console.log(inputName);
    // console.log(inputPhone);
    // console.log(inputEmail);

    setContactList(
      produce((state) => {
        const item = state.find((item,) => item.id === id);
        if (item) {
          item.name = inputName?.value;
          item.phone = inputPhone?.value;
          item.email = inputEmail?.value;
          item.isEdit = false;
        }
      })
    );
  };
  return (
    <>
      <h2 className="text-center my-5">Contacts</h2>
      <form className="d-flex" ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <input type="text" className="form-control me-1" placeholder="이름" ref={nameInputRef} />
        <input type="text" className="form-control me-1" placeholder="전화번호" ref={phoneInputRef} />
        <input type="text" className="form-control me-2" placeholder="이메일" ref={emailInputRef} />

        <button
          type="button"
          className="btn btn-outline-primary text-nowrap"
          onClick={() => {
            add();
          }}
        >
          추가
        </button>
      </form>

      <table className="table table-striped table-hover mt-5" ref={tableRef}>
        <thead>
          <tr>
            <th style={{ width: "50px" }}>#</th>
            <th style={{ width: "80px" }}>이름</th>
            <th style={{ width: "130px%" }}>전화번호</th>
            <th style={{ width: "150px" }}>이메일</th>
            <th colSpan={2} style={{ width: "80px" }}>작업</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {contactList.map((item, index) => (
            <tr className="tbody-tr" key={item.id}>
              <td className="me-1" style={{ width: "50px" }}>
                {item.id}

              </td>
              <td className="me-1" style={{ width: "80px" }}>
                {
                  item.isEdit
                    ? <input type="text" className="txt-name" defaultValue={item.name} />
                    : item.name
                }
              </td>
              <td className="me-1" style={{ width: "140px" }}>
                {
                  item.isEdit
                    ? <input type="text" className="txt-phone" defaultValue={item.phone} />
                    : item.phone
                }
              </td>
              <td className="me-1" style={{ width: "150px" }}>
                {
                  item.isEdit
                    ? <input type="text" className="txt-email" defaultValue={item.email} />
                    : item.email
                }
              </td>
              <td className="me-1" style={{ width: "35px" }}>
                {!item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                    onClick={() => {
                      edit(item.id, true);
                    }}
                  >
                    수정
                  </button>
                )}
                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                    onClick={() => {
                      save(item.id, index);
                    }}
                  >
                    저장
                  </button>
                )}
              </td>
              <td className="me-1" style={{ width: "30px" }}>
                {!item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      del(item.id, index);
                    }}
                  >
                    삭제
                  </button>
                )}

                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      edit(item.id, false);
                    }}
                  >
                    취소
                  </button>
                )}
              </td>
            </tr>
          ))}

        </tbody>
        <tfoot>
          <tr>
            {/* <td colSpan={5} className="text-center">정보를 입력하세요.</td> */}
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Contact;