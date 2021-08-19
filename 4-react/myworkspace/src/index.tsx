import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 모듈: 부분 코드 //// import/export 로 호출
// App.tsx 모듈을 가져오고(읽어와서) App이름으로 선언한거
// export default로 내보낸 객체가 App이름으로 선언됨
///// 가져온 App 함수를 이름을 꼭 App 말고 다른걸로 바꿔도 됨 근데 일반적으로 맞춰서 씀
import App from './App';  // App.tsx 에서 가져온거     

import reportWebVitals from './reportWebVitals';

// id가 root인 요소에 App 컴포넌트를 렌더링함
// 컴포넌트(component 요소 부분): 부분(조각) UI, 기능 포함
// 템플릿(template): 부분 UI, UI 구조만 가지고 있음(뼈대만 가지고 있다는 것)
// 우리가 지금 vscode 왼쪽 아이콘들도 다 컴포넌트임
// App 컴포넌트는 최상단에있는 컴포넌트임
ReactDOM.render(
  <React.StrictMode>
    <App /> {/* App 컴포넌트 처리 */}
  </React.StrictMode>,
  document.getElementById('root')
);
///// 위에 jsx 안에서 주석처리는 중괄호 안에 /* */ 해야함


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
