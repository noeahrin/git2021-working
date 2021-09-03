import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iteratorSymbol } from "immer/dist/internal";
import { penguin } from "../../common/data";


export interface ContactItem {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  profileUrl?: string;
  username?: string;
  title?: string;
  description?: string;
  createTime: number;
}

interface ContactState {
  data: ContactItem[];
  isFetched: boolean;
}

const initialState: ContactState = {
  data: [
    {
      id: 2, // id는 숫자이거나, 증가되는 문자열
      name: "Jhon",
      phone: "010-1234-5678",
      email: "John@gmail.com",
      description: "메모메모",
      createTime: new Date().getTime(),
    },
    {
      id: 1, // id는 숫자이거나, 증가되는 문자열
      name: "Smith",
      phone: "010-1111-2222",
      email: "Smith@gmail.com",
      description: "메모메모",
      createTime: new Date().getTime(),
    },
  ],
  isFetched: false,
}

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      state.data.unshift(contact);
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
        item.createTime = contact.createTime;
      };
    },
  },
});
export const { addContact, removeContact, modifyContact } = contactSlice.actions;

export default contactSlice.reducer;