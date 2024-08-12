import { toast } from "@/components/ui/use-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "./axios";
import { useLogin } from "./hooks/data/useLogin";

type AuthState = {
  authenticated: boolean;
  decryptedKey?: Buffer;
};

type AuthProps = {
  authState: AuthState;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => void;
  getDecryptedKey: () => Buffer | undefined;
};

const initialState: AuthProps = {
  authState: {
    authenticated: false,
    decryptedKey: undefined,
  },
  onLogin: async () => {},
  onLogout: () => {},
  getDecryptedKey: () => undefined,
};

const AuthContext = createContext<AuthProps>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { mutateAsync } = useLogin();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosClient.get("/auth/me");
        if (!response.data.authenticated) {
          setAuthState({
            authenticated: false,
            decryptedKey: undefined,
          });
          navigate("/login");
        }
        const decryptedKey = sessionStorage.getItem("decryptedKey");
        setAuthState({
          authenticated: true,
          decryptedKey: decryptedKey
            ? Buffer.from(decryptedKey, "base64")
            : undefined,
        });
      } catch (error) {
        setAuthState({
          authenticated: false,
          decryptedKey: undefined,
        });
        navigate("/login");
      }
    };

    checkAuthStatus();
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const data = await mutateAsync({ email, password });
      console.log(data);
      if (data) {
        setAuthState({
          authenticated: true,
          decryptedKey: data.decryptedKey, // Store the decrypted key from login
        });

        sessionStorage.setItem(
          "decryptedKey",
          data.decryptedKey.toString("base64")
        );
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Invalid Email or Password",
          variant: "destructive",
        });
      }
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

  const logoutUser = async () => {
    try {
      await axiosClient.post("/auth/logout");
      setAuthState({ authenticated: false, decryptedKey: undefined }); // Clear the decrypted key
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out.",
        variant: "destructive",
      });
    }
  };

  const getDecryptedKey = () => authState.decryptedKey;

  const value = {
    authState,
    onLogin: loginUser,
    onLogout: logoutUser,
    getDecryptedKey, // Function to access the decrypted key
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
