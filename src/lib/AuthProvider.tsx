import { toast } from "@/components/ui/use-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "./axios";
import { useLogin } from "./hooks/data/useLogin";

const TOKEN_KEY = "token";

type AuthState = {
  token: string | undefined;
  authenticated: boolean;
};

type AuthProps = {
  authState: AuthState;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => void;
};

const initialState: AuthProps = {
  authState: {
    token: undefined,
    authenticated: false,
  },
  onLogin: async () => {},
  onLogout: () => {},
};

const AuthContext = createContext<AuthProps>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { mutateAsync, isLoading } = useLogin();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    token: undefined,
    authenticated: false,
  });

  useEffect(() => {
    if (authState.authenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [authState.authenticated]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        setAuthState({ token, authenticated: true });
        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }
    };

    checkToken();
  }, []);

  const loginUser = async (email: string, password: string) => {
    if (isLoading) console.log("Loading...");
    try {
      const data = await mutateAsync({ email, password });
      if (!data?.accessToken) {
        toast({
          title: "Error",
          description: "Invalid Email or Password",
          variant: "destructive",
        });
        return;
      }

      setAuthState({ token: data.accessToken, authenticated: true });
      axiosClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      localStorage.setItem(TOKEN_KEY, data.accessToken);
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const logoutUser = async () => {
    setAuthState({ token: undefined, authenticated: false });
    axiosClient.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = {
    authState,
    onLogin: loginUser,
    onLogout: logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  if (!AuthContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(AuthContext);
};
