import React from "react";
import { useStorageState } from "./useStorageState";

type UserAccount = {
  id: string;
  typeAccount: 'Company' | 'Consumer' | 'Driver' | 'Guest';
  email: string;
  nome: string;
};

const AuthContext = React.createContext<{
  signIn: (userData: UserAccount) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userAccount?: UserAccount | null;
  isGuest: boolean;
  signInAsGuest: () => void;
}>( {
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  userAccount: null,
  isGuest: false,
  signInAsGuest: () => null,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider (props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [userAccount, setUserAccount] = React.useState<UserAccount | null>(null);
  const [isGuest, setIsGuest] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData: UserAccount) => {
          setSession("UserSessionToken");
          setUserAccount(userData);
          setIsGuest(false);
        },
        signOut: () => {
          setSession(null);
          setUserAccount(null);
          setIsGuest(false);
        },
        // aqui define o usuário como convidado
        signInAsGuest: () => {
          setSession("UserSessionToken")
          setUserAccount({
            id: "guest",
            typeAccount: "Guest",
            email: "guest@guest.com",
            nome: "Guest User",
          });
          setIsGuest(true);
        },
        session,
        isLoading,
        userAccount,
        isGuest,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}