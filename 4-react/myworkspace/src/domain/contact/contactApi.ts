import axios from "axios";

// 서버로 부터 받아오는 데이터 1건에 대한 타입
interface ContactItemReponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdTime: number;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const contactApi = {
  // axios.get<응답데이터의타입>(응답URL);
  // GET 응답URL HTTP/1.1
  fetch: () =>
    axios.get<ContactItemReponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),
};

export default contactApi;
