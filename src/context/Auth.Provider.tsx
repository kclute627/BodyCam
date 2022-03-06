import React, {
  FunctionComponent,
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Auth, Hub } from "aws-amplify";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Tajawal_400Regular,
  Tajawal_300Light,
  Tajawal_700Bold,
} from "@expo-google-fonts/tajawal";

type AuthContextTypes = {
  user: { [key: string]: any } | null;
  setUser: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};
const AuthContext = createContext<AuthContextTypes>({
  user: null,
  setUser: () => {},
});
// TODO //
// some sort of error handler
// check current user aginst the database if current user not there create new user in the database
export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<null | { [key: string]: any }>(null);
  const [authLoded, setAuthLoded] = useState(false);

  const [fontsLoaded] = useFonts({
    Tajawal_400Regular,
    Tajawal_300Light,
    Tajawal_700Bold,
  });

  useEffect(() => {
    checkUser();

    Hub.listen("auth", hubListner);
    return () => {
      Hub.remove("auth", hubListner);
    };
  }, []);

  const hubListner = (hubData) => {
    const { data, event } = hubData.payload;

    switch (event) {
      case "signOut":
        setUser(null);
        break;
      case "signIn":
        setUser(data);
        break;
      case "customOAuthState":
        setUser(data);
      default:
        break;
    }
  };

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
    setAuthLoded(true);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {authLoded && fontsLoaded ? <>{children}</> : <AppLoading />}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
