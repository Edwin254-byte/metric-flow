import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

interface AuthContextData {
  isLoggedIn: boolean;
  token: string | undefined;
  setToken: (tkn: string) => void;
}

export const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  token: undefined,
  setToken: tkn => {},
});

export function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const changeTokenHandler = (tkn: string) => {
    if (!tkn) return;

    //Decode the token and ensure it is not expired.
    const payload = jwtDecode(tkn);

    if (payload.exp) {
      const timeDiff = payload.exp * 1000 - Date.now();
      const tknExpInMs = 1 * 60 * 60 * 1000;
      //Set the user to be logged in, if the token is not yet expired
      if (timeDiff > 1000 && timeDiff < tknExpInMs) {
        setIsLoggedIn(true);
        setToken(tkn);
      } else {
        setIsLoggedIn(false);
        setToken("");
      }
    }
  };

  const value: AuthContextData = {
    isLoggedIn,
    setToken: changeTokenHandler,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
