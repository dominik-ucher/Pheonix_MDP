import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import Navbar from "./components/Navbar"; TO-DO
// import Footer from "./components/Footer"; TO-DO
import Home from "./pages/Home"


const Layout = () =>{
  return (
    <>
    <ScrollToTop />
    {/* <Navbar /> */}
    <Outlet />
    {/* <Footer /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/about",
        element:<About/>,
      },
      {
        path:"/contact",
        element:<Contact/>,
      },
    ]
  },
]);

function AppRouting() {
  return (
    <RouterProvider router={router}/>
  );
}



export default AppRouting;
