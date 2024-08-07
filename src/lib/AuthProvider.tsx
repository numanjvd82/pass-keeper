import { toast } from "@/components/ui/use-toast";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom"; // Added useLocation
import { axiosClient } from "./axios";
import { useLogin } from "./hooks/data/useLogin";
import { isTokenExpired, TOKEN_KEY } from "./utils";

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

  const checkToken = useCallback(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && !isTokenExpired(token)) {
      setAuthState({ token, authenticated: true });
    } else {
      setAuthState({ token: undefined, authenticated: false });
      axiosClient.defaults.headers.common["Authorization"] = undefined;
      localStorage.removeItem(TOKEN_KEY);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const logoutUser = () => {
    // Reset auth state on logout
    setAuthState({ token: undefined, authenticated: false });
    axiosClient.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
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
