import { createBrowserRouter } from "react-router";
import RootLayout from "../components/Layout/RootLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
      },
    ],
  },
]);
