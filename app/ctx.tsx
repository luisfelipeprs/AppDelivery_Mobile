import React from "react";
import { useStorageState } from "./useStorageState";

type UserAccount = {
  id: string;
  typeAccount: string;
  email: string;
  nome: string;
  // Adicione outros dados relevantes da conta aqui
};

const AuthContext = React.createContext<{
  signIn: (userData: UserAccount) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userAccount?: UserAccount | null; // Adicionando os dados da conta do usuário
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  userAccount: null,
});

// Hook para acessar o contexto do usuário
export function useSession () {
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

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData: UserAccount) => {
          // Lógica de login
          setSession("John Doe"); // Exemplo, poderia ser um token JWT ou outra lógica
          setUserAccount(userData); // Salvando os dados da conta do usuário no estado
        },
        signOut: () => {
          setSession(null);
          setUserAccount(null); // Limpar os dados da conta ao sair
        },
        session,
        isLoading,
        userAccount, // Expondo os dados da conta
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
