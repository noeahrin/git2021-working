import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 모듈: 부분 코드
// App.tsx 모듈을 가져오고(읽어와서) App이름으로 선언함
// export default로 내보낸 객체가 App이름으로 선언됨
// 가져온 App 함수를 이름을 꼭 App 말고 다른걸로 바꿔도 됨 근데 일반적으로 맞춰서 씀
import App from './App';  // App.tsx      

import reportWebVitals from './reportWebVitals';

// id가 root인 요소에 App 컴포넌트를 렌더링함
// 컴포넌트(component): 부분 UI, 기능 포함
// 템플릿(template): 부분 UI, UI 구좀나 가짐
ReactDOM.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트 */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
