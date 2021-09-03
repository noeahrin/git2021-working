import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { removeContact } from "./contactSlice";

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const contactItem = useSelector((state: RootState) =>
    state.cotact.data.find((item) => item.id === +id)
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Contact Detail</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>이름</th>
            <td>{contactItem?.name}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{contactItem?.phone}</td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>{contactItem?.email}</td>
          </tr>
          <tr>
            <th>메모</th>
            <td>{contactItem?.description}</td>
          </tr>
        </tbody>
      </table>

      <button
        className="btn btn-secondary float-start me-1"
        onClick={() => {
          history.push("/contacts");
        }}
      >
        <i className="bi bi-table"></i>
        목록
      </button>
      <div className="float-end">
        <button
          className="btn btn-primary  me-1"
          onClick={() => {
            history.push(`/contacts/edit/${id}`);
          }}
        >
          <i className="bi bi-check" />
          수정
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(removeContact(+id));
            history.push("/contacts");
          }}
        >
          <i className="bi bi-check" />
          삭제
        </button>
      </div>
    </div>
  );
}
export default ContactDetail;