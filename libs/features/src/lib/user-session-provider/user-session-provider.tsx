import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useLocalStorage } from "react-use";
import { UserResponse } from "@chess/utils";

const UserSessionContext = React.createContext<
  | {
      user: ReturnType<typeof useLocalStorage>["0"] | Record<string, unknown>;
      setUser: ReturnType<typeof useLocalStorage>["1"];
      hasUser: boolean;
      logout: () => void;
    }
  | undefined
>(undefined);
interface UserSessionProviderProps {
  children: React.ReactNode;
}
export const useSession = () => {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error("useSession must be wapped in a <UserSessionProvider />");
  }
  return context;
};

export function UserSessionProvider(props: UserSessionProviderProps) {
  const router = useRouter();
  const [user, setUser] = useLocalStorage<
    UserResponse | Record<string, unknown>
  >("user", {});

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };
  const value: any = {
    user,
    hasUser: Boolean(user?.id),
    setUser,
    logout,
  };
  return (
    <UserSessionContext.Provider value={value}>
      {props.children}
    </UserSessionContext.Provider>
  );
}

export default UserSessionProvider;
