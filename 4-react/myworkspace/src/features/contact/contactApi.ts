import axios from "axios";

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface ContactItemResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdTime: number;
}

export interface ContactItemRequest {
  name?: string;
  phone?: string;
  email?: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const contactApi = {
  // axios.get<응답데이터의타입>(응답URL);
  // GET 응답URL HTTP/1.1
  fetch: () =>
    axios.get<ContactItemResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (contactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(`${process.env.REACT_APP_API_BASE}/contacts`, contactItem),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, contactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`, contactItem),


};
export default contactApi;
