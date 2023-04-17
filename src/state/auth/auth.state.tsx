import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from "react";

interface AuthState {
  accessToken: string | null;
  hasSignedIn: boolean;
}

interface AuthBehaviour {
  setAccessToken: (newAccessToken: string) => void;
}

const AuthContext = createContext<(AuthState & AuthBehaviour) | null>(null);
AuthContext.displayName = "[Context] Auth";

export interface AuthContextProviderProps extends PropsWithChildren {
  overrideInitialValues?: Partial<AuthState>;
}

export const AuthContextProvider = ({
  children,
  overrideInitialValues
}: AuthContextProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>(
    overrideInitialValues?.accessToken || ""
  );
  const hasSignedIn = useMemo(() => accessToken !== "", [accessToken]);

  const valueCollection = {
    accessToken,
    setAccessToken,
    hasSignedIn
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
