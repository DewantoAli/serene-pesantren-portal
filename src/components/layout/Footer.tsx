
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-islamic-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-islamic-gold flex items-center justify-center">
                <span className="text-islamic-navy text-lg font-serif font-bold">IH</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-medium text-white">Irsyadulhaq</span>
                <span className="text-xs text-islamic-sand/80 -mt-1">Islamic Boarding School</span>
              </div>
            </div>
            <p className="text-sm text-islamic-sand/80 mt-4">
              Nurturing future leaders with Islamic values, academic excellence, and character development since 1985.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-islamic-sand hover:text-islamic-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-islamic-sand hover:text-islamic-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-islamic-sand hover:text-islamic-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-medium mb-4 text-islamic-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/registration" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Apply Now</Link>
              </li>
              <li>
                <Link to="/organization" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Organization</Link>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">News & Events</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Gallery</a>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h3 className="font-display text-lg font-medium mb-4 text-islamic-gold">Our Programs</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Tahfidz Quran</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Islamic Studies</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Arabic Language</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">General Education</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Character Building</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Extracurricular</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-medium mb-4 text-islamic-gold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-islamic-gold mr-2 mt-0.5" />
                <span className="text-sm text-islamic-sand/80">123 Islamic Center Street, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-sand/80">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-sand/80">info@irsyadulhaq.or.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-islamic-navy/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-islamic-sand/60">
              &copy; {new Date().getFullYear()} Irsyadulhaq Islamic Boarding School. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-xs text-islamic-sand/60 hover:text-islamic-gold transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-xs text-islamic-sand/60 hover:text-islamic-gold transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-xs text-islamic-sand/60 hover:text-islamic-gold transition-colors">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
