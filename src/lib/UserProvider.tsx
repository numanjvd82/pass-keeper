import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useUser } from "./hooks/data/useUser";
import { User } from "./types";

type UserContext = {
  user: User;
};

const ctx: UserContext = {
  user: {
    id: 0,
    name: "",
    email: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const UserContext = createContext<UserContext>(ctx);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(ctx.user);
  const { authState } = useAuth();
  const { data } = useUser(authState.authenticated);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  if (!useContext(UserContext)) {
    throw new Error("useCurrentUser must be used within a UserProvider");
  }
  return useContext(UserContext);
};
