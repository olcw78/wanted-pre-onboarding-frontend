import { createContext, type PropsWithChildren, useContext } from "react";

interface AuthState {}

interface AuthBehaviour {
  accessToken: () => string | null;
  hasAccessToken: () => boolean;
  updateAccessToken: (accessToken: string) => void;
}

const AuthContext = createContext<(AuthState & AuthBehaviour) | null>(null);
AuthContext.displayName = "[Context] Auth";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const updateAccessToken = (accessToken: string) => {
    localStorage.setItem("access-token", accessToken);
  };
  const accessToken = () => localStorage.getItem("access-token");
  const hasAccessToken = () => accessToken() !== null && accessToken() !== "";

  const valueCollection = {
    accessToken,
    hasAccessToken,
    updateAccessToken
  };

  return (
    <AuthContext.Provider value={valueCollection}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "<AuthContext.Provider> has not been being provided anywhere!"
    );
  }

  return ctx;
};
