import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="border-b border-gray-200 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Log In</Link>
          <button onClick={toggleDarkMode} className="text-gray-500 p-2 rounded-full">
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;