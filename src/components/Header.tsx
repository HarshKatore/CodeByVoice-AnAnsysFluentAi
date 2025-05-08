import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/ansys.png" alt="Ansys Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Fluenta-An Ansys Fluent Voice Assistant
              </h1>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <p className="text-sm text-gray-200">Powered by ChatGPT</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-sm text-gray-200 hover:text-white transition-colors font-medium"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-sm text-gray-200 hover:text-white transition-colors font-medium"
            >
              Support
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
