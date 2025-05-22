export type Chat = {
  id: string;
  title: string;
};

export type Message = {
  id: string;
  content: string;
  role: string;
  createdAt: Date;
};
