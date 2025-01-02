import Register from "./pages/register";
import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
