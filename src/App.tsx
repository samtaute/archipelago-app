import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/auth/Error";
import { Home } from "./pages/Home";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useContext } from "react";
import { AppContext } from "./contexts/realm-context";
import { Login, Signup } from "./pages/auth/BaseAuth";
import { TreeEditor } from "./pages/TreeEditor";
import ConfirmationPage from "./pages/auth/Confirmation";
import RootLayout from "./components/ui/RootLayout";
// import RootLayout from "./components/ui/RootLayout";

const router = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Home />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "confirmation",
        element: <ConfirmationPage/>
      }
    ],
  },
  {
    path: "/app",
    element: <RootLayout/>,
    children: [
      {
        index: true, element: <TreeEditor/>
      }
    ]
  },
]);

const graphqlUri =
  "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/node-app-sjxov/graphql";

function App() {
  const app = useContext(AppContext);
  async function getValidAccessToken() {
    // Guarantee that there's a logged in user with a valid access token
    if (!app?.currentUser) {
      // If no user is logged in, log in an anonymous user. The logged in user will have a valid
      // access token.
      await app?.logIn(Realm.Credentials.anonymous());
    } else {
      // An already logged in user's access token might be stale. Tokens must be refreshed after
      // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
      await app.currentUser.refreshAccessToken();
    }
    return app!.currentUser!.accessToken;
  }

  const client = new ApolloClient({
    link: new HttpLink({
      uri: graphqlUri,
      fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken();
        if (options && options?.headers) {
          //@ts-expect-error Authorization must be added.
          options.headers.Authorization = `Bearer ${accessToken}`;
        }
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            nodes: {
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router}></RouterProvider>
    </ApolloProvider>
  );
}

export default App;
