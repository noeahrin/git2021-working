import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { ContactItem, modifyContact } from "./contactSlice";
const ContactEdit = () => {


  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();

  const save = () => {
    if (contactItem) {
      const item: ContactItem = {
        id: contactItem.id,
        name: nameInput.current?.value,
        phone: phoneInput.current?.value,
        email: emailInput.current?.value,
        description: textArea.current?.value,
        createdTime: new Date().getTime(),
      }
      dispatch(modifyContact(item));
      history.push(`/contacts/detail/${id}`);
    }
  };
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Edit</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input className="form-control" type="text" defaultValue={contactItem?.name} ref={nameInput} />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input className="form-control" type="text" defaultValue={contactItem?.phone} ref={phoneInput} />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input className="form-control" type="text" defaultValue={contactItem?.email} ref={emailInput} />
              </td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  defaultValue={contactItem?.description}
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
          onClick={() => {
            save();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
            history.push(`/contacts/detail/${id}`);
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