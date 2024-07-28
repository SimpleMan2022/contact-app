import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePages from "./pages/Home.tsx";
import MessagePages from "@/pages/Message.tsx";
import {DarkModeProvider} from "@/context/useDarkMode.tsx";
import LoginPages from "@/pages/Login.tsx";
import {AuthenticateProvider} from "@/context/useAuthenticate.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePages/>,
        errorElement: <h1>404</h1>
    },
    {
        path: '/messages',
        element: <MessagePages/>,
    },
    {
        path:'/auth/login',
        element: <LoginPages/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthenticateProvider>
        <DarkModeProvider>
              <RouterProvider router={router}/>
        </DarkModeProvider>
      </AuthenticateProvider>
  </React.StrictMode>,
)
