import { createBrowserRouter } from "react-router-dom";
import QuizCreate from "./pages";
import SubCategory from "./pages/subCategory";

const routes = createBrowserRouter([
  {
    // index: true,
    path: "/",
    element: <QuizCreate />,
  },
  {
    path: "/sub",
    element: <SubCategory />,
  },
]);

export default routes;
