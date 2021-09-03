import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { PhotoItem } from "./photoSlice";

const PhotoDetail = () => {
  // useParam<타입>(), 매개변수들을 객체화gkf gudtlrdmf wpsjflrdmfh sjgdjwna
  // Generic: <타입> 타입을 매개변수로 넣음
  // 타입에 따라서 처리를 다르게 하기위함
  // 객체지향 다향성(poly mophism): 같은 이름의 함수가 내부적으로 처리를 다르게 해줌
  const { id } = useParams<{ id: string }>();

  // 타입 단언을 하지 않으면 추론에 의해서 PhotoItem | unindefined 타입이 됨
  // 타입단언을 하면 반환형식을 정의할 수 있음
  const photoItem = useSelector((state: RootState) =>
    state.photo.data.find((item) => item.id === +id)
  );  // 반환형식을 타입추론으로 처리
  // ) as PhotoItem;  // 타입 단언 (type assertion)

  return (
    <div>
      <h2 className="text-center">Photo Detail</h2>
    </div>
  );
};

export default PhotoDetail;