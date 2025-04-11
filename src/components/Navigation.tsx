
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ClipboardList, History, UserCircle, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 p-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="font-bold text-sm">WI</span>
          </div>
          <span className="font-bold text-lg text-primary">Wash-It</span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-40 p-4">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/orders" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              <ClipboardList size={20} />
              <span>Current Orders</span>
            </Link>
            <Link 
              to="/history" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              <History size={20} />
              <span>Order History</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 p-3 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              <UserCircle size={20} />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}

      {/* Desktop navigation */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="container max-w-md mx-auto">
          <div className="flex justify-between items-center p-2">
            <Link to="/" className="flex flex-col items-center p-2 transition-colors hover:text-primary">
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/orders" className="flex flex-col items-center p-2 transition-colors hover:text-primary">
              <ClipboardList size={20} />
              <span className="text-xs mt-1">Orders</span>
            </Link>
            <Link to="/history" className="flex flex-col items-center p-2 transition-colors hover:text-primary">
              <History size={20} />
              <span className="text-xs mt-1">History</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center p-2 transition-colors hover:text-primary">
              <UserCircle size={20} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
