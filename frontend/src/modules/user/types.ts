export type User = {
  id: string;
  name: string;
  email: string;
  designation: string;
  role: string;
  bio: string;
  profile_image: string;
  created_at: Date;
  updated_at: Date;
};

export type UserState = {
  user: User;
  users: User[];
  isLoading: boolean;
  error: string | null;
};

export type UserActions = {
  getSingleUser: (id: string) => Promise<User>;
  getAuthenticatedUser: (email: string) => Promise<User>;
  getAllUsers: () => Promise<User[]>;
  userLogin: (user: {
    name: string;
    email: string;
    profile_image: string;
  }) => Promise<void>;
};

export type UserStore = UserState & UserActions;
