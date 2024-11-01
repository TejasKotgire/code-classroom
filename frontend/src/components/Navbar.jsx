import React from 'react';
import { Link } from 'react-router-dom';
import { Book, LogOut, BookOpen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate();
  function logout(){
    Cookies.remove('authToken');
    Cookies.remove('role');
    Cookies.remove('userId');
    navigate('/')
  }
  function navClass(){
    let role = Cookies.get('role');
    if(role == 'teacher'){
      navigate('/admin/classrooms')
    }
    else{
      navigate('/classrooms')
    }
  }
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Project Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                CodeClassroom
              </span>
            </div>
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link
                to="/assignments"
                className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <BookOpen className="h-5 w-5 mr-1" />
                Assignments
              </Link>
              <Link
                onClick={navClass}
                // to="/classrooms"
                className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Users className="h-5 w-5 mr-1" />
                Classrooms
              </Link>
            </div>
          </div>

          {/* Right side - Logout Button */}
          <div className="flex items-center">
            <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/assignments"
            className="flex items-center text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            <BookOpen className="h-5 w-5 mr-1" />
            Assignments
          </a>
          <a
            // href="/classrooms"
            onClick={navClass}
            className="flex items-center text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            <Users className="h-5 w-5 mr-1" />
            Classrooms
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;