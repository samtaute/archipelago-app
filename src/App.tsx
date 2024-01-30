import TreeEditor from "./components/TreeEditor";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/Error";
import WelcomePage from "./pages/Welcome";
import ConfirmationPage from "./pages/Confirmation";

const router = createBrowserRouter([
  {
    path: "/archipelago-app/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <TreeEditor /> },
      { path: "login", element: <WelcomePage/> },
      { path: "confirmation", element: <ConfirmationPage/>}
    ],
  },
]);

function App() {

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
