import React from 'react';
import { NavigationTab } from '../types/index.ts';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#15110d] text-[#e5e0da] pt-16 pb-12 border-t border-[#2a2621]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#2a2621]/60">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-serif text-[24px] tracking-[0.2em] uppercase text-white block">
              VOLANTA
            </span>
            <p className="text-[13px] text-[#9e968d] leading-relaxed font-sans">
              La plataforma premier de movilidad privada en el Cono Sur. Conectamos propietarios seleccionados con conductores exigentes bajo estándares de discreción absoluta.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#bca27e]">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Flota Verificada &amp; Garantizada
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#9e968d]">
              <li>
                <button
                  onClick={() => onNavigate('explorar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mis-reservas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mis Reservas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mis-publicaciones')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Panel de Anfitriones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('crear-publicacion')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Publicar un Vehículo
                </button>
              </li>
            </ul>
          </div>

          {/* Flota de Gama Alta */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-4">
              Categorías
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#9e968d]">
              <li>Sedanes Ejecutivos de Representación</li>
              <li>SUVs Híbridos &amp; Premium All-Road</li>
              <li>Pickups Doble Tracción de Lujo</li>
              <li>Coupés y Deportivos Seleccionados</li>
              <li>Movilidad Blindada RB3/RB4 (Bajo petición)</li>
            </ul>
          </div>

          {/* Concierge & Security */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-4">
              Concierge 24/7
            </h4>
            <p className="text-[13px] text-[#9e968d] leading-relaxed mb-3">
              Asistencia personalizada y coordinación de entregas en puntos estratégicos, aeropuertos y domicilios particulares.
            </p>
            <div className="space-y-1.5 text-[12px] text-[#bca27e]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>+54 (11) 4821-VOLANTA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>concierge@volantamobility.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6d665f] gap-4">
          <p>© {new Date().getFullYear()} VOLANTA Mobility Club S.A. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Privacidad y Confidencialidad</span>
            <span>Términos del Club</span>
            <span>Póliza Todo Riesgo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
