import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { VillageContext } from '../context/VillageContext';

const Logo: React.FC = () => {
    const { villageProfile } = useContext(VillageContext);
    return (
        <div className="flex items-center">
            <div className="flex flex-col">
                <span className="font-bold text-lg text-emerald-700">Desa {villageProfile.nama_desa}</span>
                <span className="text-xs text-gray-500">Kec. {villageProfile.kecamatan}, Kab. {villageProfile.kabupaten}</span>
            </div>
        </div>
    );
};

const NavLinks: React.FC<{ className?: string, onLinkClick?: () => void }> = ({ className, onLinkClick }) => {
  const linkClasses = "px-3 py-2 rounded-md text-sm font-semibold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300";
  const activeLinkClasses = "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white";

  return (
    <nav className={className}>
      <NavLink to="/" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses} onClick={onLinkClick}>Beranda</NavLink>
      <NavLink to="/profil" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses} onClick={onLinkClick}>Profil Desa</NavLink>
      <NavLink to="/pemerintahan" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses} onClick={onLinkClick}>Pemerintahan</NavLink>
      <NavLink to="/pelayanan" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses} onClick={onLinkClick}>Pelayanan</NavLink>
      <NavLink to="/berita" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses} onClick={onLinkClick}>Berita</NavLink>
      <NavLink to="/wisata" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses} onClick={onLinkClick}>Potensi & Wisata</NavLink>
      <NavLink to="/kontak" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses} onClick={onLinkClick}>Kontak</NavLink>
    </nav>
  );
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex-shrink-0">
            <Logo />
          </NavLink>
          <div className="hidden md:block">
            <NavLinks className="ml-10 flex items-baseline space-x-2" />
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-emerald-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <NavLinks className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col" onLinkClick={() => setIsOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;