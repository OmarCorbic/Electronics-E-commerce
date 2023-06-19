import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import NotFound from "./components/NotFound";
import ProductDetails from "./components/ProductDetails";

// loaders
// import { getProducts } from "./pages/Products/Products";
import { getProductDetails } from "./components/ProductDetails";

// store
import store from "./store/store";

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
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
