import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  },
});
export const { addContact } = contactSlice.actions;

export default contactSlice.reducer;