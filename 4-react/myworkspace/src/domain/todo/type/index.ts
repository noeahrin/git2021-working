// 1건에 대한 타입
interface TodoItemState {
  id: number;
  memo: string | undefined;
  username: string | undefined;
  image?: string | undefined;
  createTime: number;
}

export type { TodoItemState };
