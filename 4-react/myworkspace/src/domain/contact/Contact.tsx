import { useRef, useState } from "react";
import produce from "immer";

interface ContactState {
  id: number;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  createTime?: number;
  isEdit?: boolean;
}

// const getTimeString = (unixtime: number) => {
//   const dateTime = new Date(unixtime);
//   return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
// };

const Contact = () => {
  const [contactList, setContactList] = useState<ContactState[]>([
    { id: 2, name: "Jhon", phone: "010-1234-5678", email: "John@gmail.com" },
    { id: 1, name: "Smith", phone: "010-1111-2222", email: "Smith@gmail.com" },
  ]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const nameEditRef = useRef<HTMLInputElement>(null);
  const phoneEditRef = useRef<HTMLInputElement>(null);
  const emailEditRef = useRef<HTMLInputElement>(null);


  const tbodyTr = tableRef.current?.querySelectorAll("tr");
  const tbodyTrNum = tbodyTr?.length;



  const add = () => {
    if (nameInputRef.current?.value && phoneInputRef.current?.value && emailInputRef.current?.value) {
      const contact: ContactState = {
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
      })
    );


    const tbodyTr = tableRef.current?.querySelectorAll("tr");
    console.log(id);
    console.log(tbodyTr?.length);
    console.log(contactList.length);

    id = contactList.length;
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

    const inputName = nameEditRef;
    const inputPhone = phoneEditRef;
    const inputEmail = emailEditRef;

    const input = tableRef.current?.querySelectorAll("input")[index];
    console.log(input);

    setContactList(
      produce((state) => {
        const item = state.find((item,) => item.id === id);
        if (item) {
          item.name = inputName?.current?.value;
          item.phone = inputPhone?.current?.value;
          item.email = inputEmail?.current?.value;
          item.isEdit = false;
        }
      })
    );
  };
  return (
    <>
      <h2 className="text-center my-5">Contact</h2>
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
                {!item.isEdit && item.name}
                {item.isEdit && (
                  <input type="text" className="txt-name" defaultValue={item.name} ref={nameEditRef} />
                )}
              </td>
              <td className="me-1" style={{ width: "140px" }}>
                {!item.isEdit && item.phone}
                {item.isEdit && (
                  <input type="text" className="txt-phone" defaultValue={item.phone} ref={phoneEditRef} />
                )}
              </td>
              <td className="me-1" style={{ width: "150px" }}>
                {!item.isEdit && item.email}
                {item.isEdit && (
                  <input type="text" className="txt-email" defaultValue={item.email} ref={emailEditRef} />
                )}
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