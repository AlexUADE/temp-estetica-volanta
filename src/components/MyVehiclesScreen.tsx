import React from 'react';
import { Vehicle, NavigationTab } from '../types/index.ts';

interface MyVehiclesScreenProps {
  vehicles: Vehicle[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectVehicleForPhotos: (vehicle: Vehicle) => void;
  onSelectVehicleForListing: (vehicle: Vehicle) => void;
}

export const MyVehiclesScreen: React.FC<MyVehiclesScreenProps> = ({
  vehicles,
  onNavigate,
  onSelectVehicleForPhotos,
  onSelectVehicleForListing,
}) => {
  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#cec5bc]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ede9e3] text-[#755a2a] text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[13px]">garage</span>
              Gestión de Flota Privada
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#15110d] tracking-tight">
              Mis Vehículos Registrados
            </h1>
            <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
              Vehículos validados con documentación legal, inspección técnica y cobertura aprobada en el club Volanta.
            </p>
          </div>

          <button
            onClick={() => onNavigate('registrar-vehiculo')}
            className="px-5 py-2.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            Registrar Nuevo Vehículo
          </button>
        </div>

        {/* Vehicles List */}
        <div className="my-8 space-y-6">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/40 shadow-xs hover:shadow-md transition-shadow flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
                {/* Photo with cover indicator */}
                <div className="w-full sm:w-56 aspect-[16/10] rounded-xl overflow-hidden bg-[#e5e0da] shrink-0 relative">
                  <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold uppercase tracking-wider">
                    {v.categoryLabel}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                    {v.images.length} fotos
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[12px] font-bold text-[#15110d] bg-[#f5f3f0] px-2.5 py-1 rounded border border-[#ece8e2]">
                      Patente: {v.plate}
                    </span>
                    <span className="text-[11px] font-semibold text-[#2b7a4b] bg-[#eef7f0] px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">verified</span>
                      Documentación Aprobada
                    </span>
                  </div>

                  <h3 className="font-serif text-[22px] font-medium text-[#15110d] leading-snug">
                    {v.name}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px] text-[#5d564e] pt-1">
                    <div>
                      <span className="text-[10px] text-[#7d766e] block uppercase font-bold">Color</span>
                      <span className="font-medium text-[#15110d]">{v.color}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7d766e] block uppercase font-bold">Transmisión</span>
                      <span className="font-medium text-[#15110d]">{v.transmission.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7d766e] block uppercase font-bold">Tracción</span>
                      <span className="font-medium text-[#15110d]">{v.traction}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7d766e] block uppercase font-bold">Combustible</span>
                      <span className="font-medium text-[#15110d]">{v.fuel.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Verification badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#ece8e2] text-[11px] text-[#6d665f]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#2b7a4b]">check</span>
                      Cédula Verde
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#2b7a4b]">check</span>
                      Póliza Zurich Todo Riesgo
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#2b7a4b]">check</span>
                      VTV Vigente
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap lg:flex-col gap-2.5 w-full lg:w-44 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#ece8e2]">
                <button
                  type="button"
                  onClick={() => onSelectVehicleForPhotos(v)}
                  className="flex-1 lg:w-full py-2.5 px-3 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_library</span>
                  Gestionar Fotos
                </button>

                <button
                  type="button"
                  onClick={() => onSelectVehicleForListing(v)}
                  className="flex-1 lg:w-full py-2.5 px-3 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">publish</span>
                  Publicar en Catálogo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
