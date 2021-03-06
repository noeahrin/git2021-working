import { useRef, useState } from "react";

import produce from "immer";

interface FeedState {
  id: number;
  content?: string | undefined;
  createTime: number;
  modifyTime?: number;
  // isEdit?: boolean;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
}

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {

  const [feedList, setFeedList] = useState<FeedState[]>([]);
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
      createTime: new Date().getTime(),
    };

    // setFeedList([feed, ...feedList]);
    setFeedList(
      produce((state) => {
        state.unshift(feed);
      })
    )

    formRef.current?.reset();

    // setIsError(false);
    console.log(fileType);
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


  return (
    <>
      {/* immer */}
      <h2 className="text-center my-5">Feeds</h2>
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
      <div className="card mt-1">

        {feedList.map((item, index) => (
          <div className="card-body" key={index}>
            <div className="media">
              {
                item.fileType === "video/mp4"
                  ? <video src={item.dataUrl} controls />
                  : item.fileType === "image/jpeg" || item.fileType === "image/png"
                    ? <img src={item.dataUrl} alt="feed" style={{ width: "100%" }} />
                    : <img src={item.dataUrl} alt="feed" style={{ display: "none" }} />

              }
            </div>
            <p className="card-text">{item.content}</p>
            <span className="text-secondary">
              {getTimeString(
                item.modifyTime ? item.modifyTime : item.createTime
              )}
            </span>
            <a
              href="#!"
              onClick={() => {
                del(item.id, index);
              }}
              className="link-secondary fs-6 float-end remove"
            >
              삭제
            </a>
          </div>
        ))}
      </div>


    </>
  );
};


export default Feed;