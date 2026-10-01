import React, { useState } from 'react';
import { NavigationTab, User } from '../types/index.ts';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  cartCount: number;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, cartCount, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const navLinks: { label: string; tab: NavigationTab }[] = [
    { label: 'Explorar', tab: 'explorar' },
    { label: 'Mis reservas', tab: 'mis-reservas' },
    { label: 'Mis publicaciones', tab: 'mis-publicaciones' },
    { label: 'Mis vehículos', tab: 'mis-vehiculos' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fbf9f6]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(42,38,33,0.03)] border-b border-[#cec5bc]/30">
      <div className="h-20 max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-10">
          <button
            onClick={() => onNavigate('explorar')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-[26px] tracking-[0.18em] uppercase text-[#15110d] transition-opacity group-hover:opacity-80">
              VOLANTA
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => onNavigate(link.tab)}
                  className={`px-3.5 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#eae8e5] text-[#1b1c1a]'
                      : 'text-[#4b463f] hover:text-[#1b1c1a] hover:bg-[#f5f3f0]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Icon Button */}
          <button
            onClick={() => onNavigate('carrito')}
            aria-label="Carrito de reservas"
            className="relative p-2.5 rounded-lg text-[#4b463f] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#755a2a] text-[10px] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* "+ Publicar vehículo" Button */}
          <button
            onClick={() => onNavigate('crear-publicacion')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#15110d] text-white font-sans text-[12px] font-semibold uppercase tracking-wider hover:bg-[#2a2621] transition-all shadow-[0_2px_8px_-2px_rgba(42,38,33,0.06)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] mr-1.5">add</span>
            Publicar vehículo
          </button>

          <div className="h-5 w-[1px] bg-[#cec5bc]/40 hidden sm:block"></div>

          {/* User Account Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="flex items-center gap-2 pl-1 py-1 pr-2 rounded-lg text-[#4b463f] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#15110d] text-white flex items-center justify-center font-semibold text-xs">
                {user ? user.firstName.charAt(0) : <span className="material-symbols-outlined text-[18px]">person</span>}
              </div>
              <span className="hidden md:inline-block font-sans text-[12px] font-semibold text-[#1b1c1a]">
                {user ? user.firstName : 'Mi cuenta'}
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#7d766e] hidden md:inline-block">
                expand_more
              </span>
            </button>

            {/* Account Popover Menu */}
            {accountMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-[0_12px_32px_-8px_rgba(42,38,33,0.12)] border border-[#cec5bc]/40 p-2 z-50 animate-in fade-in slide-in-from-top-2"
                onClick={() => setAccountMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-[#cec5bc]/30 mb-1">
                  <p className="font-semibold text-sm text-[#15110d]">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-[#7d766e]">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-[#ffdeaa] text-[#271900]">
                    Anfitrión VIP
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('mi-cuenta')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#4b463f] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">account_circle</span>
                  Mi Perfil & Seguridad
                </button>
                <button
                  onClick={() => onNavigate('mis-reservas')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#4b463f] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  Mis Reservas
                </button>
                <button
                  onClick={() => onNavigate('mis-publicaciones')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#4b463f] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">directions_car</span>
                  Mis Publicaciones
                </button>
                <button
                  onClick={() => onNavigate('mis-vehiculos')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#4b463f] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">garage</span>
                  Mi Cochera Registrada
                </button>
                <div className="border-t border-[#cec5bc]/30 mt-1 pt-1">
                  <button
                    onClick={() => onNavigate('mi-cuenta')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#15110d] hover:bg-[#f5f3f0] rounded-lg"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f6] border-b border-[#cec5bc]/40 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => {
                onNavigate(link.tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold ${
                currentTab === link.tab
                  ? 'bg-[#eae8e5] text-[#1b1c1a]'
                  : 'text-[#4b463f] hover:bg-[#f5f3f0]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('crear-publicacion');
              setMobileMenuOpen(false);
            }}
            className="w-full text-center mt-3 py-2.5 rounded bg-[#15110d] text-white text-xs font-semibold uppercase tracking-wider"
          >
            + Publicar vehículo
          </button>
        </div>
      )}
    </header>
  );
};
