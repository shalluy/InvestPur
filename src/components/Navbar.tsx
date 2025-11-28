import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">I</div>
              <span className="font-bold text-xl text-gray-900">InvestHub</span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link to="/explore" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">Products</Link>
              <Link to="/explore?type=bond" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">Bonds</Link>
              <Link to="/explore?type=fd" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">FDs</Link>
              <Link to="/explore?type=mutual_fund" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">Mutual Funds</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-700 px-3 py-2 text-sm font-medium">About</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/explore" className="p-2 text-gray-500 hover:text-blue-700">
              <Search className="w-5 h-5" />
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-blue-700 font-medium text-sm hover:underline">Login</Link>
              <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                Sign Up
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/explore" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50">Products</Link>
            <Link to="/explore?type=bond" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50">Bonds</Link>
            <Link to="/explore?type=fd" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50">FDs</Link>
            <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50">Login</Link>
            <Link to="/signup" className="block px-3 py-2 text-base font-medium text-blue-700 hover:bg-blue-50">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
