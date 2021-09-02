import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { addContact, ContactItem } from "./contactSlice";
const ContactEdit = () => {

  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const history = useHistory();

  const contactEditData = useSelector((state: RootState) => state.cotact.data);

  const dispatch = useDispatch<AppDispatch>();



  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Edit</h2>
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
                <input className="form-control" type="text" defaultValue={""} ref={emailInput} />
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
      <div className="float-end">
        <button
          className="btn btn-primary me-1"

        >
          <i className="bi bi-check" />
          저장
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/contacts/edit");
          }}
        >
          <i className="bi bi-check" />
          취소
        </button>
      </div>
    </div>
  );
};
export default ContactEdit;