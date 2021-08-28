
import { useRef } from "react";
import Feed from "./Feed";
import { FeedState } from "./type";

interface ModalProp {
  item: FeedState;
  onClose: () => void; // 콜백함수
  onSave: (editItem: FeedState) => void; // 콜백함수
}

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {

  const postRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  let dataUrl: string | undefined;
  let fileType: string | undefined;

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      // console.log(file);

      const reader = new FileReader();
      // console.log(fileRef.current?.files);
      reader.readAsDataURL(file);
      reader.onload = () => {
        dataUrl = reader.result?.toString();
        fileType = file.type;
      };
    } else {
      dataUrl = undefined;
      fileType = undefined;
    }
  };

  const save = () => {
    const feed: FeedState = {
      id: item.id,
      content: postRef.current?.value, // 수정된 입력값
      dataUrl: dataUrl,
      fileType: fileType,
      createTime: item.createTime,
    };
    console.log(feed);
    onSave(feed);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
        onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">EDIT FEED</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
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
          { }
          <div className="media text-center mt-4">
            {
              item.fileType === "video/mp4"
                ? <video src={item.dataUrl} style={{ width: "80%" }} controls />
                : item.fileType === "image/jpeg" || item.fileType === "image/png"
                  ? <img src={item.dataUrl} alt="feed" style={{ width: "80%" }} />
                  : <img src={item.dataUrl} alt="feed" style={{ display: "none" }} />
            }
          </div>
          <p className="card-text">{item.content}</p>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
              }}
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                save();
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedEditModal;