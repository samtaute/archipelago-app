import * as Realm from "realm-web";
import { PropsWithChildren, useEffect, useState, useCallback, useMemo, createContext } from "react";



function createApp(id: string) {
  return new Realm.App({ id });
}

type appContextModel = {
    currentUser: Realm.User<any> | null;
    logIn: (credentials: Realm.Credentials) => Promise<void>;
    logOut: () => Promise<void>;
    id: string;
    emailPasswordAuth: any;
    allUsers?: Readonly<any>|null;
}|null

export const AppContext = createContext<appContextModel>(null); 

function AppProvider({
  appId,
  children,
}: PropsWithChildren<{ appId: string }>) {  

  


  const [app] = useState(createApp(appId));
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  //todo: investigate whether this useEffect is necessary
  useEffect(() => {   
    anonymousLogin(); 

    async function anonymousLogin(){
      const credentials = Realm.Credentials.anonymous(); 
      const user = await app.logIn(credentials)
      setCurrentUser(user)
    }

  }, [app]);


  const logIn = useCallback(
    async (credentials: Realm.Credentials) => {
      await app.logIn(credentials);
      setCurrentUser(app.currentUser);
    },
    [app]
  );
  const logOut = useCallback (async ()=>{
    try {
        const user = app.currentUser;
        await user?.logOut();
        if(user){
          await app.removeUser(user);
        }
      } catch (err) {
        console.error(err);
      }
      setCurrentUser(app.currentUser);

  }, [app])

  const appContext = useMemo(()=>{
    return {...app, currentUser, logIn, logOut}
  }, [app, currentUser, logIn, logOut])


//   const AppContext = createContext(appContext)


  return (
    <AppContext.Provider value={appContext}>
        {children}
    </AppContext.Provider>
  )
}

export default AppProvider; 

