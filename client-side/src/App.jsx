import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import ProtectedRoutes, { checkLoginStatus } from "./layouts/ProtectedRoutes";

// pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./components/NotFound";
import ProductDetails, { getProductDetails } from "./components/ProductDetails";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/products/:category" element={<Products />} />
      <Route path="/products/:category/:search" element={<Products />} />
      <Route
        path="/product/:id"
        element={<ProductDetails />}
        loader={({ params }) => getProductDetails(params)}
      />
      <Route element={<ProtectedRoutes />} loader={checkLoginStatus}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
