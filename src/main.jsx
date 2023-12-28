import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDirectory from "./components/directoryHomePage/HomePage";
import CountryDropdown from "./components/profilrComponent/CountryDropdown";
import WatchComponent from "./components/profilrComponent/Clock";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserDirectory />,
  },
  {
    path: "/cart",
    element: <WatchComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
)