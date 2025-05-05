/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type UserState = {
  user: User;
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  response: any;
};

export type UpdateProfileImage = {
  id: string;
  formData: FormData;
};

export type UserActions = {
  getSingleUser: (id: string) => Promise<User>;
  getAuthenticatedUser: (email: string) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  getAuthors: () => Promise<User[]>;
  refetchUser: () => Promise<any>;
  updateUser: (id: string, data: Partial<User>) => Promise<any>;
  userLogin: (user: {
    name: string;
    email: string;
    profile_image: string;
  }) => Promise<void>;
  updateUserProfileImage: (data: UpdateProfileImage) => Promise<any>;
};

export type UserStore = UserState & UserActions;
