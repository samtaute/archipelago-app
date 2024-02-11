import * as Realm from "realm-web";

import {
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  useMemo,
  createContext,
} from "react";

//connect to realm app
function createApp(id: string) {
  return new Realm.App(id);
}



type appContextModel = {
  currentUser: Realm.User<any> | null;
  logIn: (credentials: Realm.Credentials) => Promise<void>;
  logOut: () => Promise<void>;
  id: string;
  emailPasswordAuth: any;
  allUsers?: Readonly<any> | null;
} | null;

export const AppContext = createContext<appContextModel>(null);

function AppProvider({
  appId,
  children,
}: PropsWithChildren<{ appId: string }>) {
  // Store Realm.App in React state. If appId changes, all children will rerender and use the new App.
  const [app, setApp] = useState(createApp(appId));

  useEffect(() => {
    setApp(createApp(appId));
  }, [appId]);

  // Store the app's current user in state and wrap the built-in auth functions to modify this state
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  // Wrap the base logIn function to save the logged in user in state
  const logIn = useCallback(
    async (credentials: Realm.Credentials<SimpleObject>) => {
      await app.logIn(credentials);
      setCurrentUser(app.currentUser);
    },
    [app]
  );

  //wrap the current user's logOut function to remove the logged out user from state.
  const logOut = useCallback(async () => {
    try {
      const user = app.currentUser;
      await user?.logOut();
      await app.removeUser(user!);
    } catch (err) {
      console.error(err);
    }
     // In this App there will only be one logged in user at a time, so
    // the new current user will be null. If you add support for
    // multiple simultaneous user logins, this updates to another logged
    // in account if one exists.
    setCurrentUser(app.currentUser)
  }, [app]);


  const appContext: appContextModel = useMemo(() => {
    return { ...app, currentUser, logIn, logOut};
  }, [app, currentUser, logIn, logOut]);

  //   const AppContext = createContext(appContext)

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
