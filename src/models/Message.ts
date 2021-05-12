export type Messages = Message[];

export interface Message {
  authorName: string;
  authorId: string;
  text: string;
  createdAt: Object;
  key: string;
}
