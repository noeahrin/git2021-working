import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { addContact, ContactItem } from "./contactSlice";

const ContactCreate = () => {

  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const history = useHistory();

  const contactData = useSelector((state: RootState) => state.contact.data);

  const dispatch = useDispatch<AppDispatch>();

  const handileAddClick = () => {
    if (nameInput.current?.value && phoneInput.current?.value && emailInput.current?.value) {
      const item: ContactItem = {
        id: contactData.length ? contactData[0].id + 1 : 1,
        name: nameInput.current.value,
        phone: phoneInput.current.value,
        email: emailInput.current.value,
        description: textArea.current?.value,
        createdTime: new Date().getTime(),
      }
      dispatch(addContact(item));
      history.push("/contacts");
    }
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Create</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input className="form-control" type="text" ref={nameInput} />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input className="form-control" type="text" ref={phoneInput} />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input className="form-control" type="text" ref={emailInput} />
              </td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  ref={textArea}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <button
        className="btn btn-secondary float-start"
        onClick={() => {
          history.push("/contacts");
        }}
      >
        <i className="bi bi-table"></i>
        목록
      </button>
      <button
        className="btn btn-primary float-end"
        onClick={() => {
          handileAddClick();
        }}
      >
        <i className="bi bi-check" />
        저장
      </button>
    </div>
  );
};
export default ContactCreate;