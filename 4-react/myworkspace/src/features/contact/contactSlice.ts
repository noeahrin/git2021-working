import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// 데이터 구조를 interface로 만듬
export interface ContactItem {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  profileUrl?: string;
  username?: string;
  title?: string;
  description?: string;
  createdTime: number;
}

// 백엔드 연동 고려해서 state 구조 설계
interface ContactState {
  data: ContactItem[];
  isFetched: boolean; // 서버에서 데이터를 받아왔는지에 대한 여부
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
}

const initialState: ContactState = {
  data: [
    {
      id: 2, // id는 숫자이거나, 증가되는 문자열
      name: "Jhon",
      phone: "010-1234-5678",
      email: "John@gmail.com",
      description: "메모메모",
      createdTime: new Date().getTime(),
    },
    {
      id: 1, // id는 숫자이거나, 증가되는 문자열
      name: "Smith",
      phone: "010-1111-2222",
      email: "Smith@gmail.com",
      description: "메모메모",
      createdTime: new Date().getTime(),
    },
  ],
  isFetched: false,
}

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // payload로 item 객체를 받음
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      state.data.unshift(contact);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },

    // payload 없는 reducer
    // completed 관련된 속성을 삭제(undefined상태)
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id로 index를 찾은 후 1개 삭제
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      const item = state.data.find((item) => item.id === contact.id);
      if (item) {

        item.name = contact.name;
        item.phone = contact.phone;
        item.email = contact.email;
        item.description = contact.description;
        item.createdTime = contact.createdTime;
      };
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contacts = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = contacts;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});
export const { addContact, initialCompleted, removeContact, modifyContact, initialContact } = contactSlice.actions;

export default contactSlice.reducer;