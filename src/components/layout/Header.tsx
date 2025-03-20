
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Registration', path: '/registration' },
    { name: 'Organization', path: '/organization' },
    { name: 'About', path: '/about' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/90 shadow-sm backdrop-blur-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-islamic-navy flex items-center justify-center">
            <span className="text-white text-lg font-serif font-bold">IH</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-islamic-navy">Irsyadulhaq</span>
            <span className="text-xs text-islamic-slate -mt-1">Islamic Boarding School</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'islamic-link text-sm font-medium transition-all',
                isActive(link.path) 
                  ? 'text-islamic-teal after:w-full' 
                  : 'text-islamic-navy hover:text-islamic-teal'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/registration" 
            className="btn-primary text-sm px-5 py-2"
          >
            Apply Now
          </Link>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-islamic-navy focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        'fixed inset-0 bg-white z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        'md:hidden'
      )}>
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-lg font-medium py-2 border-b border-gray-100',
                isActive(link.path) ? 'text-islamic-teal' : 'text-islamic-navy'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/registration" 
            className="btn-primary text-center mt-4"
          >
            Apply Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
