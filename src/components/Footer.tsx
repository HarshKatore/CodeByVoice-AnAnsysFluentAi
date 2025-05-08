import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Fluenta-An Ansys Fluent Voice
              Assistant
            </p>
            <p className="text-sm mt-1 text-ansys-orange">
              Developed by Harsh Katore
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
