import Navbar from "@/components/Navbar.tsx";
import React from "react";
import {useDarkMode} from "@/context/useDarkMode.tsx";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isDarkMode } = useDarkMode();

    return (
       <>
        <Navbar/>
           <div className={`container mb-32 ${isDarkMode ? 'dark' : 'bg-white'}`}>
               {children}
           </div>
       </>
    )
}

export default Layout