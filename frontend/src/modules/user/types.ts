export type User = {
  id: string;
  name: string;
  email: string;
  designation: string;
  role: string;
  bio: string;
  posts?: number;
  profile_image: string;
  created_at: Date;
  updated_at: Date;
};

export type UpdateProfileImage = {
  id: string;
  formData: FormData;
};
