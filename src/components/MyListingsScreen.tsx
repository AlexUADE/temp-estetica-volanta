import React, { useState } from 'react';
import { Vehicle, NavigationTab } from '../types/index.ts';

interface MyListingsScreenProps {
  vehicles: Vehicle[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectVehicleForAvailability: (vehicle: Vehicle) => void;
  onSelectVehicleForPhotos: (vehicle: Vehicle) => void;
  onToggleStatus: (vehicleId: string) => void;
}

export const MyListingsScreen: React.FC<MyListingsScreenProps> = ({
  vehicles,
  onNavigate,
  onSelectVehicleForAvailability,
  onSelectVehicleForPhotos,
  onToggleStatus,
}) => {
  const [showPendingRequestModal, setShowPendingRequestModal] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);

  // Filter host's vehicles (e.g. Audi A4 and Toyota RAV4)
  const hostVehicles = vehicles.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#cec5bc]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ede9e3] text-[#755a2a] text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[13px]">shield_person</span>
              Panel de Propietario / Anfitrión
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#15110d] tracking-tight">
              Mis Publicaciones
            </h1>
            <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
              Administre sus unidades en alquiler, ajuste tarifas, defina rangos disponibles y apruebe solicitudes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('gestion-disponibilidad')}
              className="px-4 py-2.5 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              Calendario General
            </button>
            <button
              onClick={() => onNavigate('crear-publicacion')}
              className="px-5 py-2.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Publicar Vehículo
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
              Vehículos Publicados
            </span>
            <span className="font-serif text-3xl font-bold text-[#15110d] block mt-1">
              {hostVehicles.length} unidades
            </span>
            <span className="text-[11px] text-[#2b7a4b] font-medium mt-2 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Todos con seguro vigente
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
              Ingresos de este Mes
            </span>
            <span className="font-serif text-3xl font-bold text-[#15110d] block mt-1">
              $1.420.000
            </span>
            <span className="text-[11px] text-[#755a2a] font-medium mt-2 block">
              +18% vs. mes anterior
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
              Ocupación Proyectada
            </span>
            <span className="font-serif text-3xl font-bold text-[#15110d] block mt-1">
              78%
            </span>
            <span className="text-[11px] text-[#6d665f] mt-2 block">
              21 días reservados en Noviembre
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
              Solicitudes Pendientes
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-3xl font-bold text-[#755a2a]">
                {requestAccepted ? 0 : 1}
              </span>
              <span className="text-[12px] text-[#7d766e]">por responder</span>
            </div>
            {!requestAccepted && (
              <button
                onClick={() => setShowPendingRequestModal(true)}
                className="text-[11px] text-[#755a2a] font-bold underline mt-2 block cursor-pointer"
              >
                Revisar solicitud ahora &rarr;
              </button>
            )}
          </div>
        </div>

        {/* Pending Request Alert Banner if not accepted */}
        {!requestAccepted && (
          <div className="mb-8 p-5 rounded-2xl bg-[#ede9e3] border border-[#cec5bc] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#755a2a] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div>
                <strong className="text-[#15110d] text-[13px] block">
                  Nueva solicitud para Audi A4 2.0 TFSI Quattro
                </strong>
                <p className="text-[12px] text-[#5d564e]">
                  Solicitante: <strong>Ignacio Lascano</strong> • Fechas: 14 al 17 de Noviembre (3 días) • Monto neto: <strong>$229.500</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRequestAccepted(true)}
                className="px-4 py-2 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[11px] font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                Aceptar y Confirmar
              </button>
              <button
                onClick={() => setShowPendingRequestModal(true)}
                className="px-3.5 py-2 rounded-xl border border-[#cec5bc] bg-white text-[#15110d] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Ver Perfil
              </button>
            </div>
          </div>
        )}

        {/* Vehicle Listings List */}
        <div className="space-y-6">
          <h2 className="font-serif text-[22px] font-semibold text-[#15110d]">
            Mis Unidades Activas
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {hostVehicles.map((v) => {
              const isActive = v.status === 'active';
              return (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                    <div className="w-full sm:w-48 aspect-[16/10] rounded-xl overflow-hidden bg-[#e5e0da] shrink-0 relative">
                      <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                        {v.images.length} fotos
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] font-bold text-[#7d766e]">
                          {v.plate}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isActive
                              ? 'bg-[#eef7f0] text-[#2b7a4b]'
                              : 'bg-[#f5f3f0] text-[#7d766e]'
                          }`}
                        >
                          {isActive ? 'Publicación Activa' : 'Pausada'}
                        </span>
                        <span className="text-[11px] text-[#755a2a] font-semibold">
                          {v.categoryLabel}
                        </span>
                      </div>

                      <h3 className="font-serif text-[20px] font-medium text-[#15110d]">
                        {v.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#6d665f]">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-[#755a2a]">location_on</span>
                          {v.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-[#755a2a]">payments</span>
                          <strong className="text-[#15110d]">${v.pricePerDay.toLocaleString('es-AR')}</strong> / día
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#ece8e2]">
                    <button
                      type="button"
                      onClick={() => onSelectVehicleForAvailability(v)}
                      className="px-3.5 py-2 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      Disponibilidad
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectVehicleForPhotos(v)}
                      className="px-3.5 py-2 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">photo_library</span>
                      Fotos ({v.images.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleStatus(v.id)}
                      className={`px-3.5 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#5d564e]'
                          : 'bg-[#2b7a4b] hover:bg-[#23633d] text-white'
                      }`}
                    >
                      {isActive ? 'Pausar' : 'Activar'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pending Request Modal */}
      {showPendingRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#755a2a] block">
                  Solicitud de Reserva Concierge
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#15110d]">
                  Ignacio Lascano
                </h3>
                <span className="text-[12px] text-[#2b7a4b] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Conductor Verificado • 5.0 ★
                </span>
              </div>
              <button
                onClick={() => setShowPendingRequestModal(false)}
                className="text-[#7d766e] hover:text-[#15110d] p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f3f0] space-y-2 text-[13px] text-[#4b463f]">
              <div className="flex justify-between">
                <span>Vehículo Solicitado:</span>
                <strong className="text-[#15110d]">Audi A4 2.0 TFSI Quattro</strong>
              </div>
              <div className="flex justify-between">
                <span>Fechas:</span>
                <strong className="text-[#15110d]">14 al 17 de Noviembre (3 días)</strong>
              </div>
              <div className="flex justify-between">
                <span>Punto de Retiro:</span>
                <span>Cochera Recoleta, CABA</span>
              </div>
              <div className="flex justify-between text-[#15110d] pt-2 border-t border-[#ece8e2] font-semibold">
                <span>Pago a Acreditar:</span>
                <span className="text-[#2b7a4b] font-serif text-[18px]">$229.500</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setRequestAccepted(true);
                  setShowPendingRequestModal(false);
                }}
                className="flex-1 py-3 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider cursor-pointer"
              >
                Aceptar Reserva
              </button>
              <button
                type="button"
                onClick={() => setShowPendingRequestModal(false)}
                className="px-5 py-3 rounded-xl border border-[#cec5bc] text-[#5d564e] text-[12px] font-semibold uppercase tracking-wider cursor-pointer"
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
