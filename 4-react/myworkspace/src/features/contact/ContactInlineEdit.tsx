import React, { useEffect, useRef, useState } from "react";
import produce from "immer";

import api from "./contactApi";

// contact 1건에 대한 타입
interface ContactItemState {
  id: number;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  createdTime?: number;
  isEdit?: boolean;
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

  // 에러 여부 state
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);


  const fetchData = async () => {
    // 백엔드에서 바로 데이터를 받아옴
    const res = await api.fetch();

    // axios에서 응답받는 데이터는 data속성에 들어가 있음
    // 서버로부터 받은 데이터를 state 객체로 변환함
    const contacts = res.data.map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      createdTime: item.createdTime,
    })) as ContactItemState[];

    setLoading(false); // 로딩중 여부 state 업데이트
    setContactList(contacts); // todo state 업데이트

    console.log("--2. await axios.get completed--");
  };
  useEffect(() => {
    console.log("--1. mounted--");
    // 백엔드에서 데이터를 받아올 것임
    // ES8 style로 async-await 기법을 이용해서 데이터를 조회해옴
    fetchData();
  }, []);

  const add = async (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    // 이벤트 객체가 있을 때는 입력박스에서 엔터 입력
    if (e) {
      if (e.code !== "Enter") return;
    }

    // 입력값이 없으면 에러 메시지 표시
    if (!(nameInputRef.current?.value && phoneInputRef.current?.value && emailInputRef.current?.value)) {
      setErrMessage("정보를 입력해주세요.");
      setIsError(true);
      return;
    }

    // -------------- 백엔드 연동 부분 ----------------------
    // try {
    //   ...코드 실행부분
    //  }
    //  catch(e) {
    //    // 코드처리중 에러(예외)가 발생하면 실행되는 곳
    //    // e라는 객체는 어떤 에러인지, 에러메시지가 무엇인지를 담고 있음
    //  }
    try {
      // // 백엔드에서 응답 데이터를 줄 때
      // marshalling: 프로그램객체(메모리)구조에서 -> 데이터전송용구조
      // : Java Object -> JSON String

      // ^
      // HTTP Response Body
      // v

      // // 프론트엔드에서 응답 데이터를 받을 때
      // un-marshalling: 데이터전송용구조 -> 프로그램객체구조
      // : JSON String -> Javascript Object
      const result = await api.add({
        name: nameInputRef.current?.value,
        phone: phoneInputRef.current?.value,
        email: emailInputRef.current?.value,
      });
      // const result = await api.add({ memo: "" }); // 강제로 오류 발생 시켜봄
      console.log(result);

      // -------------- state 변경부분 ------------------------
      // 서버에서 처리한 데이터로 설정
      const contact: ContactItemState = {
        id: result.data.id,
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        createdTime: result.data.createdTime,
      };
      // const contact: ContactItemState = {
      //   id: contactList.length > 0 ? contactList[0].id + 1 : 1,
      //   // optional chaning
      //   memo: inputRef.current?.value,
      //   createdTime: new Date().getTime(),
      // };

      // console.log(contactList);
      // immer 없이 새로운 배열을 생성하여 state 변경
      // setContactList([contact, ...contactList]);

      // current state -> draft state -> next state
      // draft state를 조작함
      setContactList(
        // produce(([draftstate변수]) => {draft state 변수 조작})
        // 반환 객체는 변경된 state(next state)
        produce((state) => {
          // draft state 배열에 추가
          // draft state의 타입은 TodoItemState[]
          state.unshift(contact);
        })
      );

      // 입력값 초기화
      formRef.current?.reset();
      // 에러 메시지 제거
      setIsError(false);
    } catch (e: any) {
      console.log(e.response);
      // 에러메시지를 표시
      const message = (e as Error).message;
      setIsError(true);
      setErrMessage(message);
    }
  };

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
        <input type="text" className="form-control me-2" placeholder="이메일" ref={emailInputRef} onKeyPress={(e) => {
          add(e);
        }} />

        <button
          type="button"
          className="btn btn-outline-primary text-nowrap"
          onClick={() => {
            add(null);
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