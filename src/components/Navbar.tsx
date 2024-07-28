import React, { useState } from 'react';
import { PiHamburger } from "react-icons/pi";
import { RiMailSendLine, RiHome2Line } from "react-icons/ri";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useDarkMode } from "@/context/useDarkMode.tsx";
import { RxMoon, RxSun } from "react-icons/rx";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className={`mb-2 font-bold  ${isDarkMode ? 'dark text-white' : 'bg-neo-primary text-black'}`}>
                    <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="flex items-center">
                        <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-neo-secondary'}`}>
                            <RiMailSendLine size={30}/>
                        </div>
                        <div className="hidden md:flex space-x-6 ml-10">
                            <Link to="/" className={`hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Home</Link>
                            <Link to="/messages" className={`hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Message</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex space-x-4 items-center">
                        <a href="https://www.linkedin.com/in/rosyadadityanugroho" target="_blank" className={`hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            <FaLinkedin size={25}/>
                        </a>
                        <a href="https://www.instagram.com/aditnugroho______" target="_blank" className={`hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            <FaInstagram size={25} />
                        </a>
                        <Button onClick={toggleDarkMode} size="icon" className="bg-transparent hover:bg-transparent">
                            {isDarkMode ? <RxSun className="text-white text-2xl"/> : <RxMoon className="text-black text-2xl"/>}
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <Button onClick={toggleDarkMode} size="icon" className="bg-transparent hover:bg-transparent">
                            {isDarkMode ? <RxSun className="text-white text-2xl"/> : <RxMoon className="text-black text-2xl"/>}
                        </Button>
                        <button onClick={toggleMenu} className={`ml-3 ${isDarkMode ? 'text-white' : 'text-gray-800'} hover:text-neo-secondary`}>
                            <PiHamburger size={25}/>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className={`md:hidden px-6 pb-4 ${isDarkMode ? 'dark' : 'bg-neo-primary'}`}>
                        <Link to="/" className={`block hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Home</Link>
                        <Link to="/messages" className={`block hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Message</Link>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.linkedin.com/in/rosyadadityanugroho" target="_blank" className={`hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                <FaLinkedin size={25}/>
                            </a>
                            <a href="https://www.instagram.com/aditnugroho______" target="_blank" className={`hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                <FaInstagram size={25}/>
                            </a>
                        </div>
                    </div>
                )}
            </nav>
            <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-neo-primary border-gray-200'}`}>
                <div className="flex justify-around py-2">
                    <Link to="/" className={`flex flex-col items-center hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <RiHome2Line size={25}/>
                        <span className="text-xs">Home</span>
                    </Link>
                    <Link to="/messages" className={`flex flex-col items-center hover:text-neo-secondary ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <RiMailSendLine size={25}/>
                        <span className="text-xs">Message</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
