export type Comment = {
  id: string;
  post: { id: string; title: string };
  user: { id: string; name: string; profile_image: string };
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
