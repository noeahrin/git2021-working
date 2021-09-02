// https://react.vlpt.us/styling/02-css-module.html
// css module
// 파일명.module.css
// css를 사용하는 컴포넌트 범위로 css class 사용범위를 좁힐 수 있음.

import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux"; // react 앱에 redux store를 제공해줌
import { store } from "./store";        // redux store 변수

import Home from "./domain/Home";
import Profile from "./domain/profile/Profile";


// SPA(Single Page Application)
// : 페이지 파일이 1개, index.html
// : 특정 영역(Switch)에 컴포넌트(js)를 로딩함
// : 애플리케이션이 컴파일될 때 import한 컴포넌트가 같이 컴파일됨
//   -> 컴파일됐을 때 파일크기가 커짐, 초기 로딩할 때 시간 걸림

// Lazy-Loading 처리
// 컴포넌트를 방문하는 시점에 로딩함
const Todo = lazy(() => import("./domain/todo/Todo"));
const Feed = lazy(() => import("./domain/feed/Feed"));
const ContactInlineEdit = lazy(() => import("./domain/contact/ContactInlineEdit"));
const Photo = lazy(() => import("./domain/photo/Photo"));
const PhotoCreate = lazy(() => import("./domain/photo/PhotoCreate"));
// const PhotoDetail = lazy(() => import("./domain/photo/PhotoDetail"));
// const PhotoEdit = lazy(() => import("./domain/photo/PhotoEdit"));
const Contact = lazy(() => import("./domain/contact/Contact"));
const ContactCreate = lazy(() => import("./domain/contact/ContactCreate"));
const ContactDetail = lazy(() => import("./domain/contact/ContactDetail"));
const ContactEdit = lazy(() => import("./domain/contact/ContactEdit"));


// React == 컴포넌트 개발 라이브러리
function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* main container */}
        <div className="mx-auto">
          <header className="app-bar d-flex justify-content-end bg-primary shadow">

            < Profile />
          </header>
          <nav className="drawer-menu position-fixed bg-light shadow-sm">
            <h3 className="ms-2 fs-4">MY WORKSPACE</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
              <li>
                <Link to="/feeds">Feeds</Link>
              </li>
              <li>
                <Link to="/contactInlineEdit">ContactInlineEdit</Link>
              </li>
              <li>
                <Link to="/photos">Photos</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
            </ul>
          </nav>
          <main className="content-container">
            {/* Suspense 컴포넌트로 로딩중에 보여줄 화면을 처리하는 것 */}
            {/* fallback={로딩중에 보여줄 컴포넌트} */}
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {/* Switch 영역에 컴포넌트가 로딩됨 */}

                {/* 해당 경로에 대해서 로딩할 컴포넌트 목록을 작성 */}
                <Route path="/" component={Home} exact />
                <Route path="/todo" component={Todo} />
                <Route path="/feeds" component={Feed} />
                <Route path="/contact" component={ContactInlineEdit} />
                <Route path="/photos" component={Photo} exact />
                <Route path="/photos/create" component={PhotoCreate} />
                {/* id라는 매개변수를 url 경로에 넘김, path parameter */}
                {/* <Route path="/photos/:id" component={PhotoDetail} exact /> */}
                {/* <Route path="/photos/edit/:id" component={PhotoEdit} /> */}
                <Route path="/contacts" component={Contact} exact />
                <Route path="/contacts/create" component={ContactCreate} />
                <Route path="/contacts/:id" component={ContactDetail} exact />
                <Route path="/contacts/edit/:id" component={ContactEdit} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
export default App;
