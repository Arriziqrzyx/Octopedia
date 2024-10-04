import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
// import Login from "./pages/Login";
// import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  // {
  //   path: "/product/:id",
  //   element: (
  //     <MainLayout>
  //       <ProductDetail />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: "/login",
  //   element: (
  //     <MainLayout>
  //       <Login />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: "/cart",
  //   element: (
  //     <MainLayout>
  //       <Cart />
  //     </MainLayout>
  //   ),
  // },
]);

export default router;
