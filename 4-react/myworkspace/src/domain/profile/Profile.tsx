import { penguin } from "../../common/data";

// 이 컴포넌트에서 사용할 스타일시트에
// 모듈명(컴포넌트명).module.scss
import style from "./Profile.module.scss";

const Profile = () => {

  return (
    <div>
      <div className="d-flex">
        <div
          style={{ backgroundImage: `url(${penguin})` }}
          // className="Profile_thumb__1sp_F me-1"
          // 스타일변수.클래스명
          // 클래스명이 "모듈명_클래스명__"
          className={`${style.thumb} me-1`}
        >
        </div>
        <span className={`${style.username} text-light`}>Jihwan Seo</span>
      </div>
    </div >
  );
};
export default Profile;