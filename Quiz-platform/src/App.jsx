import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import QuizCreate from "./pages";
import SubCategory from "./pages/subCategory";

const queryClient = new QueryClient();

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <QuizCreate />,
    },
    {
      path: "/sub",
      element: <SubCategory />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}
