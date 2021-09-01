import { useRef, useState } from "react";

import produce from "immer";

import FeedEditModal from "./FeedEditModal";
import { FeedState } from "./type";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

const getTimeString = (unixtime: number) => {
  // 1초: 1000
  // 1분: 60 * 1000
  // 1시간: 60 * 60 * 1000
  // 1일: 24 * 60 * 60 * 1000
  const day = 24 * 60 * 60 * 1000;

  // Locale: timezone, currency 등
  // js에서는 브라우저의 정보를 이용함
  const dateTime = new Date(unixtime);

  // 현재시간보다 24시간 이전이면 날짜를 보여주고
  // 현재시간보다 24시간 미만이면 시간을 보여줌
  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Feed = () => {

  // profile state를 가지고 옴 + state가 변경되면 컴포넌트를 업데이트(비교하고 + reder)함
  const profile = useSelector((state: RootState) => state.profile);

  const [feedList, setFeedList] = useState<FeedState[]>([]);

  const [isEdit, setIsEdit] = useState(false);
  // const [isError, setIsError] = useState(false);
  const postRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const content = (dataUrl: string | undefined, fileType: string | undefined) => {

    const feed: FeedState = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,
      // optional chaning
      content: postRef.current?.value,
      dataUrl: dataUrl,
      fileType: fileType,
      username: profile.username,
      image: profile.image,
      createTime: new Date().getTime(),
      modifyTime: new Date().getTime(),
    };

    // setFeedList([feed, ...feedList]);
    setFeedList(
      produce((state) => {
        state.unshift(feed);
      })
    )

    formRef.current?.reset();

    // setIsError(false);
    // console.log(fileType);
  };

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {



    // 이벤트 객체가 있을 때는 입력박스에서 엔터 입력
    if (e) {
      if (e.code !== "Enter") return;
    }

    // console.log(fileRef.current?.files?.length);
    // file이 있어도 선택 안하면 length가 0
    if (fileRef.current?.files?.length === 1) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();
      // console.log(fileRef.current?.files);
      reader.readAsDataURL(file);
      reader.onload = () => {
        content(reader.result?.toString(), file.type);
      };
    } else {
      content(undefined, undefined);
    }

    // if (!postRef.current?.value || !fileRef.current?.files) {
    //   setIsError(true);
    //   return;
    // }
  }

  const del = (id: number, index: number) => {
    // setFeedList(feedList.filter((item) => item.id !== id));
    setFeedList(
      produce((state) => {
        state.splice(index, 1)
      })
    )
  };
  const editItem = useRef<FeedState>(
    {
      id: 0,
      content: "",
      createTime: 0,
      dataUrl: "",
      fileType: "",
      modifyTime: 0,
    }
  );
  const edit = (item: FeedState) => {
    editItem.current = item;
    setIsEdit(true);
  };

  const save = (editItem: FeedState) => {
    console.log(editItem);
    setFeedList(
      produce((state) => {
        const item = state.find((item) => item.id === editItem.id);
        if (item) {
          item.content = editItem.content;
          item.dataUrl = editItem.dataUrl;
          item.fileType = editItem.fileType;
          item.modifyTime = editItem.createTime;
          item.username = editItem.username;
          item.image = editItem.image;
        }

      })
    );
    // 모달창 닫기
    setIsEdit(false);
  };



  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      {/* immer */}
      <h2 className="text-center my-5">Feeds</h2>
      {isEdit && (
        <FeedEditModal
          item={editItem.current}
          onClose={() => {
            setIsEdit(false);
          }}
          onSave={(editItem) => {
            save(editItem);
          }}
        />
      )}

      <form
        className="mt-5"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <textarea
          className="form-control mb-1"
          placeholder="Leave a post here"
          style={{ boxSizing: "border-box", height: "15vh" }}
          ref={postRef}
        />
        <div className="d-flex">
          <input
            type="file"
            className="form-control"
            accept="image/png, image/jpeg, video/mp4"
            ref={fileRef}
          />
          <button
            className="btn btn-primary text-nowrap ms-1"
            type="button"
            onClick={() => {
              add(null);
            }}
          >
            입력
          </button>
        </div>
      </form>
      <div className="mt-1" >
        {feedList.map((item, index) => (
          <div className="card mt-1" key={index}>
            <div className="card-header">
              <span style={{ fontSize: "0.75rem" }}>
                <img
                  src={item.image}
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "50%"
                  }}
                  alt={profile.username}
                />
                - {item.username}
                {" 수정시간: "}{getTimeString(item.modifyTime)}

              </span>
            </div>
            <div className="card-body">
              <div className="media">
                {
                  item.fileType === "video/mp4"
                    ? <video src={item.dataUrl} style={{ width: "100%" }} controls />
                    : item.fileType === "image/jpeg" || item.fileType === "image/png"
                      ? <img src={item.dataUrl} alt="feed" style={{ width: "100%" }} />
                      : <img src={item.dataUrl} alt="feed" style={{ display: "none" }} />
                }
              </div>
              <p className="card-text">{item.content}</p>
              <span className="text-secondary">
                {"작성시간: "}{getTimeString(item.createTime)}
              </span>
              <a
                // # 은 내부링크니까 #!는 #은 내부, 그리고 ! 이 없어서 이동은 안함
                // 근데 주소창에 #! 붙음
                href="#!"
                onClick={(e) => {
                  // 이거 안걸면 주소창에 #!가 붙음
                  // 기본 동작 방지해줌
                  e.preventDefault();
                  del(item.id, index);
                }}
                className="link-secondary fs-6 float-end remove"
              >
                삭제
              </a>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  edit(item);
                }}
                className="link-secondary fs-6 float-end edit me-2"
              >
                수정
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Feed;