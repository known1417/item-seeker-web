
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X, User, Search, PlusCircle, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              FindIt
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/lost" className="text-sm font-medium hover:text-lost transition-colors">
            Lost Items
          </Link>
          <Link to="/found" className="text-sm font-medium hover:text-found transition-colors">
            Found Items
          </Link>
          {user ? (
            <>
              <Link to="/post-item">
                <Button variant="outline" size="sm" className="gap-1">
                  <PlusCircle size={16} /> Post Item
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Hi, {user.name.split(' ')[0]}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-1">
                  <LogOut size={16} /> Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="p-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/lost" 
              className="p-2 text-sm font-medium hover:bg-muted rounded-md flex items-center text-lost-DEFAULT"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lost Items
            </Link>
            <Link 
              to="/found" 
              className="p-2 text-sm font-medium hover:bg-muted rounded-md flex items-center text-found-DEFAULT"
              onClick={() => setMobileMenuOpen(false)}
            >
              Found Items
            </Link>
            <Link 
              to="/search" 
              className="p-2 text-sm font-medium hover:bg-muted rounded-md flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search size={16} /> Search
            </Link>
            {user ? (
              <>
                <Link 
                  to="/post-item" 
                  className="p-2 text-sm font-medium hover:bg-muted rounded-md flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlusCircle size={16} /> Post Item
                </Link>
                <hr className="my-2" />
                <div className="p-2 text-sm font-medium">Hi, {user.name.split(' ')[0]}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start gap-2"
                >
                  <LogOut size={16} /> Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full justify-start">Login</Button>
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-start">Register</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
