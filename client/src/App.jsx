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
import Company_Profile from "./pages/Company_Profile/Company_Profile";
import Login from "./pages/Login/Login";
import LoginCompany from "./pages/Login/Login_Company";
import Register from "./pages/Register/Register";
import RegisterCompany from "./pages/Register/Register_Company";
import User_Appl_Page from "./pages/User_Appl_Page/User_Appl_Page";
import User_Dashboard from "./pages/User_Dashboard/User_Dashboard";
import User_Applications from "./pages/User_Applications/User_Applications";
import User_Invitations from "./pages/User_Invitations/User_Invitations";
import User_Profile from "./pages/User_Profile/User_Profile";
import Speech_to_text from "./pages/Speech_to_text/Speech_to_text";
import Text_to_speech from "./pages/Speech_to_text/Text_to_speech";
import NotFoundPage_404 from "./pages/Error/NotFoundPage_404";
import NotAuthorized_401 from "./pages/Error/NotAuthorized_401";




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
        path:"/company_profile",
        element:<Company_Profile/>,
      },
      {
        path:"/user_appl_page",
        element:<User_Appl_Page/>,
      },
      {
        path:"/user_applications",
        element:<User_Applications/>,
      },
      {
        path:"/user_invitations",
        element:<User_Invitations/>,
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
      {
        path:"/text_to_speech",
        element:<Text_to_speech/>,
      },
      {
        path:"/Unauthorized_401",
        element:<NotAuthorized_401/>,
      },
      {
        path:'*',
        element:<NotFoundPage_404/>,
      },
    ]
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"/login_company",
    element:<LoginCompany/>,
  },
  {
    path:"/register",
    element:<Register/>,
  },
  {
    path:"/register_company",
    element:<RegisterCompany/>,
  }
]);

function AppRouting() {
  return (
    <RouterProvider router={router}/>
  );
}



export default AppRouting;
