import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContacts } from "./contactSaga";

const getTimeString = (unixtime: number) => {
  // 1초: 1000
  // 1분: 60 * 1000
  // 1시간: 60 * 60 * 1000
  // 1일: 24 * 60 * 60 * 1000
  const day = 24 * 60 * 60 * 1000;

  // Locale: timezone, currency 등
  // js에서는 브라우저의 정보를 이용함
  const dateTime = new Date(unixtime);

  // 현재시간보다 24시간 이전이면 날짜를 보여주고
  // 현재시간보다 24시간 미만이면 시간을 보여줌
  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Contact = () => {
  // contact state 전체를 가져옴
  const contact = useSelector((state: RootState) => state.contact);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  // contact.isFetched를 가져올때와 바뀔때마다 실행됨
  // **dispatch 객체는 위에서 생성된 후 바뀌지 않으므로
  // **dispatch 객체에 따른 effect가 발생하지는 않음
  useEffect(() => {
    // console.log(dispatch);
    // console.log(contact.isFetched);
    // 데이터 fetch가 안되었으면 데이터를 받아옴
    if (!contact.isFetched) {
      // 서버에서 데이터를 받아오는 action을 디스패치함
      dispatch(requestFetchContacts());
    }
  }, [dispatch, contact.isFetched]);


  return (
    <div style={{ width: "80vw" }} className="mx-auto">
      <h2 className="text-center my-5">Contact</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/contacts/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>
      <table className="table table-hover mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {contact.data.map((item, index) => (
            <tr
              className="tbody-tr"
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`/contacts/detail/${item.id}`);
              }}
            >
              <td className="me-1">
                {item.id}
              </td>
              <td className="me-1">
                {item.name}
              </td>
              <td className="me-1">
                {item.phone}
              </td>
              <td className="me-1">
                {item.email}
              </td>
              <td>
                {getTimeString(item.createdTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Contact;