import React, { useState } from 'react';
import { Reservation, NavigationTab } from '../types/index.ts';

interface MyReservationsScreenProps {
  reservations: Reservation[];
  onSelectReservation: (res: Reservation) => void;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChat: (hostName: string, vehicleName: string) => void;
}

export const MyReservationsScreen: React.FC<MyReservationsScreenProps> = ({
  reservations,
  onSelectReservation,
  onNavigate,
  onOpenChat,
}) => {
  const [activeFilter, setActiveFilter] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const upcomingReservations = reservations.filter(
    (r) => r.status === 'confirmed' || r.status === 'pending'
  );
  const completedReservations = reservations.filter((r) => r.status === 'completed');
  const cancelledReservations = reservations.filter((r) => r.status === 'cancelled');

  const currentList =
    activeFilter === 'upcoming'
      ? upcomingReservations
      : activeFilter === 'completed'
      ? completedReservations
      : cancelledReservations;

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#cec5bc]/30">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#15110d] tracking-tight">
              Mis Reservas
            </h1>
            <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
              Historial de experiencias de movilidad privada, pases digitales y coordinación con anfitriones.
            </p>
          </div>

          <button
            onClick={() => onNavigate('explorar')}
            className="px-5 py-2.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            Explorar Catálogo
          </button>
        </div>

        {/* Member Mobility Metrics Strip */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#cec5bc]/40 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f5f3f0] text-[#755a2a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">directions_car</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
                Total de Viajes
              </span>
              <span className="font-serif text-[22px] font-bold text-[#15110d]">
                {reservations.length} experiencias
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#cec5bc]/40 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f5f3f0] text-[#755a2a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
                Perfil de Conductor
              </span>
              <div className="flex items-center gap-1 font-serif text-[22px] font-bold text-[#15110d]">
                <span className="material-symbols-outlined text-[18px] text-[#d49727]">star</span>
                5.0 <span className="text-[12px] font-sans font-normal text-[#7d766e]">(Excelente)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#cec5bc]/40 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f5f3f0] text-[#755a2a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">shield</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
                Cobertura
              </span>
              <span className="font-serif text-[20px] font-bold text-[#2b7a4b]">
                Todo Riesgo Activo
              </span>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-[#cec5bc]/30 pb-4 mb-8">
          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === 'upcoming'
                ? 'bg-[#15110d] text-white shadow-xs'
                : 'bg-[#f5f3f0] text-[#5d564e] hover:bg-[#eae8e5]'
            }`}
          >
            Activas y Próximas ({upcomingReservations.length})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === 'completed'
                ? 'bg-[#15110d] text-white shadow-xs'
                : 'bg-[#f5f3f0] text-[#5d564e] hover:bg-[#eae8e5]'
            }`}
          >
            Completadas ({completedReservations.length})
          </button>
          <button
            onClick={() => setActiveFilter('cancelled')}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === 'cancelled'
                ? 'bg-[#15110d] text-white shadow-xs'
                : 'bg-[#f5f3f0] text-[#5d564e] hover:bg-[#eae8e5]'
            }`}
          >
            Canceladas ({cancelledReservations.length})
          </button>
        </div>

        {/* Bookings List */}
        {currentList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#cec5bc]/40 space-y-4 max-w-lg mx-auto">
            <span className="material-symbols-outlined text-[48px] text-[#7d766e]">inbox</span>
            <h3 className="font-serif text-xl font-semibold text-[#15110d]">
              No hay reservas en esta sección
            </h3>
            <p className="text-[13px] text-[#6d665f]">
              Cuando reserve un vehículo o complete un trayecto, podrá consultarlo aquí con todos sus comprobantes y llaves digitales.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentList.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-[#cec5bc]/40 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col lg:flex-row items-stretch"
              >
                {/* Image */}
                <div className="w-full lg:w-72 aspect-[16/10] lg:aspect-auto bg-[#e5e0da] shrink-0 relative">
                  <img
                    src={res.vehicle.images[0]}
                    alt={res.vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {res.vehicle.categoryLabel}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#755a2a] bg-[#ede9e3] px-2 py-0.5 rounded">
                          {res.code}
                        </span>
                        <span className="text-[11px] text-[#7d766e]">
                          Patente: <strong className="text-[#15110d]">{res.vehicle.plate}</strong>
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          res.status === 'confirmed'
                            ? 'bg-[#eef7f0] text-[#2b7a4b]'
                            : res.status === 'completed'
                            ? 'bg-[#f5f3f0] text-[#5d564e]'
                            : 'bg-[#fdf2f2] text-[#9b2c2c]'
                        }`}
                      >
                        {res.statusLabel}
                      </span>
                    </div>

                    <h3 className="font-serif text-[20px] font-medium text-[#15110d]">
                      {res.vehicle.name}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-[#5d564e] pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#755a2a]">calendar_today</span>
                        <span>{res.periodText} ({res.days} {res.days === 1 ? 'día' : 'días'})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#755a2a]">location_on</span>
                        <span>{res.pickupLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Host and Actions bottom */}
                  <div className="pt-4 border-t border-[#ece8e2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#15110d] text-white flex items-center justify-center text-xs font-semibold">
                        {res.hostName.charAt(0)}
                      </div>
                      <div className="text-[12px]">
                        <span className="text-[#7d766e] block text-[10px] uppercase font-bold">Anfitrión</span>
                        <span className="font-semibold text-[#15110d]">{res.hostName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenChat(res.hostName, res.vehicle.name)}
                        className="px-3.5 py-2 rounded-lg border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">chat</span>
                        Chat
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectReservation(res)}
                        className="px-4 py-2 rounded-lg bg-[#15110d] hover:bg-[#2a2621] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
                        Ver Pase &amp; Detalle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
