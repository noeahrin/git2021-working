// 1건에 대한 타입
interface FeedState {
  id: number;
  content?: string | undefined;
  createTime: number;
  modifyTime: number;
  // isEdit?: boolean;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
  username?: string | undefined;
  image?: string | undefined;
  ischange?: boolean;
}

export type { FeedState };
