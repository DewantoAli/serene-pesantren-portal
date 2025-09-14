
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';
import VisitorAnalytics from '@/components/analytics/VisitorAnalytics';

const Footer: React.FC = () => {
  return (
    <footer className="bg-islamic-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/db67760e-c635-4e65-9a39-90c4444d9ea7.png" 
                  alt="Irsyadulhaq Logo" 
                  className="h-14 w-auto"
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-medium text-white">IRSYADUL HAQ MANADO</span>
                <span className="text-xs text-islamic-sand/80 -mt-1">Pondok Pesantren</span>
              </div>
            </div>
            <p className="text-sm text-islamic-sand/80 mt-4">
              Membina pemimpin masa depan dengan nilai-nilai Islam, keunggulan akademik, dan pengembangan karakter.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com/irsyadulhaq.manado" className="text-islamic-sand hover:text-blue-400 transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/pondokpesantrenirsyadulhaq" className="text-islamic-sand hover:text-pink-400 transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@IrsyadulHaq-Manado" className="text-islamic-sand hover:text-red-400 transition-colors" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-medium mb-4 text-islamic-gold">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link to="/new-student" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Daftar Sekarang</Link>
              </li>
              <li>
                <Link to="/organization" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Organisasi</Link>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Berita & Acara</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Galeri</a>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h3 className="font-display text-lg font-medium mb-4 text-islamic-gold">Program Kami</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Tahfidz Quran</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Kajian Islam</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Bahasa Arab</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Pendidikan Umum</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Pembentukan Karakter</a>
              </li>
              <li>
                <a href="#" className="text-sm text-islamic-sand/80 hover:text-islamic-gold transition-colors">Ekstrakurikuler</a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="font-display text-lg font-medium mb-4 text-islamic-gold">Media Sosial</h3>
            <div className="space-y-4">
              <a 
                href="https://instagram.com/pondokpesantrenirsyadulhaq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 p-3 bg-islamic-navy/20 rounded-lg hover:bg-pink-500/20 transition-all duration-300"
              >
                <Instagram size={20} className="text-pink-400" />
                <div>
                  <p className="text-sm font-medium text-white">Instagram</p>
                  <p className="text-xs text-islamic-sand/60">Pondok Pesantren Irsyadul Haq</p>
                </div>
                <ExternalLink size={14} className="text-islamic-sand/40 group-hover:text-pink-400 transition-colors" />
              </a>
              
              <a 
                href="https://facebook.com/irsyadulhaq.manado" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 p-3 bg-islamic-navy/20 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
              >
                <Facebook size={20} className="text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">Facebook</p>
                  <p className="text-xs text-islamic-sand/60">Irsyadul Haq Manado</p>
                </div>
                <ExternalLink size={14} className="text-islamic-sand/40 group-hover:text-blue-400 transition-colors" />
              </a>
              
              <a 
                href="https://www.youtube.com/@IrsyadulHaq-Manado" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 p-3 bg-islamic-navy/20 rounded-lg hover:bg-red-500/20 transition-all duration-300"
              >
                <Youtube size={20} className="text-red-400" />
                <div>
                  <p className="text-sm font-medium text-white">YouTube</p>
                  <p className="text-xs text-islamic-sand/60">Irsyadul Haq Channel</p>
                </div>
                <ExternalLink size={14} className="text-islamic-sand/40 group-hover:text-red-400 transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-medium mb-4 text-islamic-gold">Hubungi Kami</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin size={18} className="text-islamic-gold mr-2 mt-0.5" />
                <span className="text-sm text-islamic-sand/80">Jl. Anggur 1, GPI, Paniki Bawah, Kec. Mapanget, Kota Manado, Sulawesi Utara 95256</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-sand/80">+62 822-9006-6969</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-sand/80">+62 812-4427-1126</span>
               </li>
              <li className="flex items-center">
                <Mail size={18} className="text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-sand/80">irsyadulhaq.manado@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Website size={18} className="text-islamic-gold mr-2" />
                <span className="text-sm text-islamic-sand/80">www.irsyadulhaq.or.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Visitor Analytics Section */}
        <VisitorAnalytics />
        
        <div className="border-t border-islamic-navy/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-islamic-sand/60">
              &copy; {new Date().getFullYear()} Pondok Pesantren Irsyadul Haq. Hak Cipta Dilindungi.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-xs text-islamic-sand/60 hover:text-islamic-gold transition-colors">Kebijakan Privasi</a>
                </li>
                <li>
                  <a href="#" className="text-xs text-islamic-sand/60 hover:text-islamic-gold transition-colors">Syarat Layanan</a>
                </li>
                <li>
                  <a href="#" className="text-xs text-islamic-sand/60 hover:text-islamic-gold transition-colors">Peta Situs</a>
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
