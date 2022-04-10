export type User = {
  id: number | null;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  rating: number;
};
export type UserResponse = Omit<User, "password">;

export type SignupResponse = {
  data: {
    auth: boolean;
    message: string;
    profile: UserResponse;
  };
};

export type ErrorResponse = {
  auth: boolean;
  message: string;
  err: Record<string, unknown>;
};
