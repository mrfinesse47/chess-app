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
