import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import QuizCreate from "./pages";
import SubCategory from "./pages/subCategory";
import QuizPage from "./pages/Quiz";
import OptionPage from "./pages/Option";

const queryClient = new QueryClient();

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <QuizCreate />,
    },
    {
      path: "/sub/:id",
      element: <SubCategory />,
    },
    {
      path: "/quiz/:id",
      element: <QuizPage />,
    },
    {
      path: "/option/:id",
      element: <OptionPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}
