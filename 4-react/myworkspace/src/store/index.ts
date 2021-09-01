// global state(전역상태) 저장소

// 프론트엔드 state: UI 처리 바뀌게 하는 변수
// -> 모달팝업상태(보이고, 안보이고), 연락처목록상태(개수(10개보이고, 5개보이고, 수정모드이고))

// 백엔드 state: 비즈니스 로직 처리가 바뀌게 하는 데이터
// -> 주문상태(주문요청, 결제, 결제환인, 배송중, 배송완료)
// -> 승인상태(제출, 검토중, 반려, 승인)

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../domain/profile/profileSlice";

// global state(전역상태) 저장소 만듦
// global state: profile, todo, contact .... 여러개 state가 있음
// 중요한건 **이러한 state들은 다른 컴포넌트와 state가 공유 됨
// 모든 state를 이러라는게 아니라 공유가 필요 한 것만
export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    // state 이름: reducer이름
    // profile state 처리하는 reducer를 등록
    profile: profileReducer,
  },
  devTools: true, // 개발툴 사용여부
});


// typescript에서는 몇가지 타입 선언을 해야함
// https://redux-toolkit.js.org/tutorials/quick-start

// root state 타입 정의
// 가장 최상위 state
// state.profile, state.contact.....
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;

// redux devtools 크롬 확장프로그램에 추가