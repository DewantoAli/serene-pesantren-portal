
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Upload, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoImage, setLogoImage] = useState<string | null>(null);
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
  
  useEffect(() => {
    const savedLogo = localStorage.getItem('customLogo');
    if (savedLogo) {
      setLogoImage(savedLogo);
    }
  }, []);
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoImage(result);
        localStorage.setItem('customLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Pendaftaran Santri Baru', path: '/new-student' },
    { name: 'Kegiatan Santri', path: '/kegiatan-santri' },
    { name: 'Organisasi', path: '/organization' },
    { name: 'Tentang', path: '/about' },
  ];

  const aplikasiSubMenu = [
    { name: 'Administrasi & Keuangan Pesantren', path: '/aplikasi-pesantren' },
  ];

  const statusPembayaranPath = '/status-pembayaran-spp';
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/90 shadow-sm backdrop-blur-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 relative group">
          {logoImage ? (
            <img src={logoImage} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/db67760e-c635-4e65-9a39-90c4444d9ea7.png" 
                alt="Irsyadulhaq Logo" 
                className="h-14 w-auto object-contain"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-display font-medium text-islamic-navy">IRSYADUL HAQ MANADO</span>
            <span className="text-xs text-islamic-slate -mt-1">Pondok Pesantren</span>
          </div>
          
          <label htmlFor="logo-upload" className="absolute -bottom-7 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-md px-2 py-1 shadow-sm text-xs flex items-center cursor-pointer">
            <Upload size={12} className="mr-1" />
            <span>Upload Logo</span>
            <Input 
              id="logo-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleLogoUpload}
            />
          </label>
        </Link>
        
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
          
          {/* Aplikasi Pesantren Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              'islamic-link text-sm font-medium transition-all flex items-center gap-1 outline-none',
              location.pathname.includes('/aplikasi-pesantren') || location.pathname.includes('/status-pembayaran')
                ? 'text-islamic-teal' 
                : 'text-islamic-navy hover:text-islamic-teal'
            )}>
              Aplikasi Pesantren
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg border z-50">
              {aplikasiSubMenu.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link to={item.path} className="cursor-pointer">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link to={statusPembayaranPath} className="cursor-pointer">
                  Status Pembayaran SPP
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            to="/new-student" 
            className="btn-primary text-sm px-5 py-2"
          >
            Daftar Sekarang
          </Link>
        </nav>
        
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-islamic-navy focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
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
          
          {/* Mobile Aplikasi Pesantren */}
          <div className="border-b border-gray-100 pb-4">
            <p className="text-lg font-medium text-islamic-navy mb-2">Aplikasi Pesantren</p>
            <div className="pl-4 space-y-2">
              {aplikasiSubMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'block text-base py-1',
                    isActive(item.path) ? 'text-islamic-teal' : 'text-islamic-slate'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to={statusPembayaranPath}
                className={cn(
                  'block text-base py-1',
                  isActive(statusPembayaranPath) ? 'text-islamic-teal' : 'text-islamic-slate'
                )}
              >
                Status Pembayaran SPP
              </Link>
            </div>
          </div>

          <Link 
            to="/new-student" 
            className="btn-primary text-center mt-4"
          >
            Daftar Sekarang
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
