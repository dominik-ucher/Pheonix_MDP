import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home"
import About from "./pages/about";
// import Navbar from "./components/Navbar"; TO-DO
// import Footer from "./components/Footer"; TO-DO
import User_Profile from "./pages/User_Profile"
import Contact from "./pages/Contact"

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
        path:"/User_Profile",
        element:<User_Profile/>,
      },
      {
        path:"/Contact",
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
