export type Chat = {
  id: string;
  _id: string;
  title: string;
};

export type Message = {
  id: string;
  _id: string;
  content: string;
  role: string;
  createdAt: Date;
};
