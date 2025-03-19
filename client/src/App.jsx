import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home"
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Company_Appl_Dashboard from "./pages/Company_Appl_Dashboard/Company_Appl_Dashboard";
import Company_Appl_Page from "./pages/Company_Appl_Page/Company_Appl_Page";
import Company_Dashboard from "./pages/Company_Dashboard/Company_Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import User_Appl_Page from "./pages/User_Appl_Page/User_Appl_Page";
import User_Dashboard from "./pages/User_Dashboard/User_Dashboard";
import User_Profile from "./pages/User_Profile/User_Profile";
import Speech_to_text from "./pages/Speech_to_text/Speech_to_text";




const Layout = () =>{
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
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
      {
        path:"/company_appl_dashboard",
        element:<Company_Appl_Dashboard/>,
      },
      {
        path:"/company_appl_page",
        element:<Company_Appl_Page/>,
      },
      {
        path:"/company_dashboard",
        element:<Company_Dashboard/>,
      },
      {
        path:"/user_appl_page",
        element:<User_Appl_Page/>,
      },
      {
        path:"/user_dashboard",
        element:<User_Dashboard/>,
      },
      {
        path:"/user_profile",
        element:<User_Profile/>,
      },
      {
        path:"/speech_to_text",
        element:<Speech_to_text/>,
      },
    ]
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"/register",
    element:<Register/>,
  },
]);

function AppRouting() {
  return (
    <RouterProvider router={router}/>
  );
}



export default AppRouting;
