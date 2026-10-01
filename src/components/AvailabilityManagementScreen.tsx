import React, { useState } from 'react';
import { Vehicle, AvailabilityRangeItem, NavigationTab } from '../types/index.ts';

interface AvailabilityManagementScreenProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle;
  availabilityRanges: AvailabilityRangeItem[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectVehicle: (v: Vehicle) => void;
  onAddRange: (range: AvailabilityRangeItem) => void;
  onRemoveRange: (id: string) => void;
}

export const AvailabilityManagementScreen: React.FC<AvailabilityManagementScreenProps> = ({
  vehicles,
  selectedVehicle,
  availabilityRanges,
  onNavigate,
  onSelectVehicle,
  onAddRange,
  onRemoveRange,
}) => {
  const [currentMonth, setCurrentMonth] = useState<'nov' | 'dic'>('nov');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStartDate, setNewStartDate] = useState('2026-01-10');
  const [newEndDate, setNewEndDate] = useState('2026-01-25');
  const [newRangeNote, setNewRangeNote] = useState('');

  // Days in November 2025: 30 days. Starts on Saturday (index 6, or Monday=0 convention)
  // Let's create an interactive calendar grid
  const [blockedDays, setBlockedDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Days 1 to 9 blocked for owner use
  const reservedDays = [14, 15, 16, 17]; // Reservation of Audi A4

  const toggleDayBlocked = (day: number) => {
    if (reservedDays.includes(day)) {
      alert('Este día ya posee una reserva confirmada por un cliente y no puede ser modificado.');
      return;
    }
    if (blockedDays.includes(day)) {
      setBlockedDays(blockedDays.filter((d) => d !== day));
    } else {
      setBlockedDays([...blockedDays, day]);
    }
  };

  const handleCreateRange = (e: React.FormEvent) => {
    e.preventDefault();
    const item: AvailabilityRangeItem = {
      id: `range_${Date.now()}`,
      startDate: newStartDate,
      endDate: newEndDate,
      status: 'scheduled',
      daysCount: 15,
      note: newRangeNote || 'Período programado de alta temporada',
      freeLabel: '100% Libre',
    };
    onAddRange(item);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-[#cec5bc]/30">
          <div>
            <button
              onClick={() => onNavigate('mis-publicaciones')}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#7d766e] hover:text-[#15110d] mb-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Volver a Publicaciones
            </button>
            <h1 className="font-serif text-3xl font-normal text-[#15110d]">
              Gestión de Disponibilidad &amp; Calendario
            </h1>
          </div>

          {/* Vehicle Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#7d766e] font-bold uppercase hidden sm:inline">
              Vehículo:
            </span>
            <select
              value={selectedVehicle.id}
              onChange={(e) => {
                const found = vehicles.find((v) => v.id === e.target.value);
                if (found) onSelectVehicle(found);
              }}
              className="bg-white border border-[#cec5bc] rounded-xl px-4 py-2 text-[13px] font-semibold text-[#15110d] focus:outline-none cursor-pointer shadow-xs"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.plate})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Informative Help banner */}
        <div className="my-6 p-4 rounded-xl bg-white border border-[#cec5bc]/40 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-[#755a2a]">touch_app</span>
            <div className="text-[13px]">
              <span className="font-bold text-[#15110d] block">
                Control interactivo de fechas
              </span>
              <span className="text-[#6d665f]">
                Haga clic sobre cualquier día del calendario para alternar entre fecha habilitada o bloqueo para su uso personal.
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#15110d] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#2a2621] transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Añadir Rango
          </button>
        </div>

        {/* 2-Columns Grid: Calendar View (7 cols) + Availability Ranges (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar on Left */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs space-y-6">
            {/* Month Switcher */}
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[20px] font-semibold text-[#15110d]">
                {currentMonth === 'nov' ? 'Noviembre 2025' : 'Diciembre 2025'}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentMonth('nov')}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold uppercase tracking-wider cursor-pointer ${
                    currentMonth === 'nov' ? 'bg-[#15110d] text-white' : 'bg-[#f5f3f0] text-[#7d766e]'
                  }`}
                >
                  Nov
                </button>
                <button
                  onClick={() => setCurrentMonth('dic')}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold uppercase tracking-wider cursor-pointer ${
                    currentMonth === 'dic' ? 'bg-[#15110d] text-white' : 'bg-[#f5f3f0] text-[#7d766e]'
                  }`}
                >
                  Dic
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#5d564e] pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#eef7f0] border border-[#2b7a4b]"></span>
                <span>Disponible para reserva</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#15110d]"></span>
                <span className="text-[#15110d] font-semibold">Reserva Confirmada (Audi A4)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#e5e0da] border border-[#cec5bc]"></span>
                <span>Bloqueado uso propio</span>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-[#7d766e] uppercase tracking-wider border-b border-[#ece8e2] pb-2">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span>Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>

            {/* Days Grid (Nov 2025 starts on Saturday = 5 empty cells) */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty padding for days before 1st of month */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square opacity-0 pointer-events-none"></div>
              ))}

              {/* Days 1 to 30 */}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isReserved = reservedDays.includes(day);
                const isBlocked = blockedDays.includes(day);

                let cellStyle = 'bg-[#fbf9f6] hover:bg-[#ede9e3] text-[#15110d] border border-[#ece8e2]';
                if (isReserved) {
                  cellStyle = 'bg-[#15110d] text-white font-bold shadow-xs';
                } else if (isBlocked) {
                  cellStyle = 'bg-[#eae8e5] text-[#9e968d] line-through border border-[#cec5bc]';
                } else {
                  cellStyle = 'bg-[#eef7f0] text-[#1b6b3e] font-medium border border-[#b8e2c5] hover:border-[#2b7a4b]';
                }

                return (
                  <button
                    key={day}
                    onClick={() => toggleDayBlocked(day)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 text-[13px] transition-all cursor-pointer relative group ${cellStyle}`}
                  >
                    <span>{day}</span>
                    {isReserved && (
                      <span className="text-[9px] font-normal opacity-90 hidden sm:block">Reserva</span>
                    )}
                    {isBlocked && (
                      <span className="material-symbols-outlined text-[12px] opacity-70">lock</span>
                    )}
                    {!isReserved && !isBlocked && (
                      <span className="text-[8px] font-bold text-[#2b7a4b] uppercase hidden sm:block">Libre</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability Ranges on Right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ece8e2]">
                <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                  Rangos de Publicación Activos
                </h3>
                <span className="text-[11px] font-bold text-[#755a2a] bg-[#ede9e3] px-2 py-0.5 rounded-full">
                  {availabilityRanges.length} Períodos
                </span>
              </div>

              <div className="space-y-3">
                {availabilityRanges.map((range) => (
                  <div
                    key={range.id}
                    className="p-4 rounded-xl border border-[#cec5bc]/40 bg-[#f5f3f0]/50 space-y-2 relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-serif text-[16px] font-semibold text-[#15110d] block">
                          {range.startDate} al {range.endDate}
                        </span>
                        <span className="text-[11px] text-[#7d766e]">
                          Duración: {range.daysCount} días corridos
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#eef7f0] text-[#2b7a4b] text-[10px] font-bold uppercase tracking-wider">
                        {range.status === 'active' ? 'En Catálogo' : 'Programado'}
                      </span>
                    </div>

                    {range.note && (
                      <p className="text-[12px] text-[#5d564e] italic">
                        "{range.note}"
                      </p>
                    )}

                    <div className="pt-2 flex justify-between items-center text-[11px]">
                      <span className="text-[#2b7a4b] font-medium">{range.freeLabel || 'Disponible'}</span>
                      <button
                        onClick={() => onRemoveRange(range.id)}
                        className="text-[#9b2c2c] hover:underline font-semibold cursor-pointer"
                      >
                        Eliminar rango
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="w-full py-3 rounded-xl border-2 border-dashed border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Añadir Nuevo Rango
              </button>
            </div>

            {/* Sync Status Info */}
            <div className="p-4 rounded-xl bg-[#ede9e3]/60 border border-[#cec5bc]/50 text-[12px] text-[#5d564e] flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] text-[#2b7a4b]">cloud_done</span>
              <div>
                <strong className="text-[#15110d] block">Sincronización Inmediata</strong>
                <span>Cualquier cambio de fecha se refleja en vivo en los motores de búsqueda de Volanta.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Range Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 lg:p-7 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-[#15110d]">
                Habilitar Período de Alquiler
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#7d766e] cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateRange} className="space-y-4 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[#1b1c1a]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                  Fecha de Fin
                </label>
                <input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[#1b1c1a]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                  Nota / Etiqueta Interna
                </label>
                <input
                  type="text"
                  placeholder="Ej: Verano Punta del Este o Disponible con chofer"
                  value={newRangeNote}
                  onChange={(e) => setNewRangeNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[#1b1c1a]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white font-semibold text-[12px] uppercase tracking-wider cursor-pointer"
                >
                  Guardar Período
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-3 rounded-xl border border-[#cec5bc] text-[#5d564e] text-[12px] font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
