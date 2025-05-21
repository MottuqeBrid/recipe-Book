import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import NotFound from "../NotFound/NotFound";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AddRecipe from "../AddRecipe/AddRecipe";
import AllRecipes from "../AllRecipes/AllRecipes";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import MyRecipes from "../MyRecipes/MyRecipes";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Profile from "../Profile/Profile";
import CommentsPage from "../CommentsPage/CommentsPage";
import BlogPage from "../BlogPage/BlogPage";
import CreateBlog from "../CreateBlog/CreateBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "recipes",
        element: <AllRecipes />,
      },
      {
        path: "blogs",
        element: <BlogPage />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "recipes/:id",
        element: <RecipeDetails />,
      },
      {
        path: "my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "comments",
        element: (
          <PrivateRoute>
            <CommentsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
