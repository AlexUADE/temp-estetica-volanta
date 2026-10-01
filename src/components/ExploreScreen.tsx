import React, { useState } from 'react';
import { Vehicle, VehicleCategory } from '../types/index.ts';

interface ExploreScreenProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onQuickBook: (vehicle: Vehicle) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  vehicles,
  onSelectVehicle,
  onQuickBook,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('all');
  const [searchLocation, setSearchLocation] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('2025-11-14');
  const [endDate, setEndDate] = useState<string>('2025-11-17');
  const [sortOption, setSortOption] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');

  const categories: { key: VehicleCategory; label: string; icon: string }[] = [
    { key: 'all', label: 'Todos los vehículos', icon: 'directions_car' },
    { key: 'sedan', label: 'Sedanes Ejecutivos', icon: 'speed' },
    { key: 'suv', label: 'SUVs & Híbridos', icon: 'electric_car' },
    { key: 'pickup', label: 'Pickups Premium', icon: 'local_shipping' },
    { key: 'deportivo', label: 'Coupés & Deportivos', icon: 'sports_motorsports' },
  ];

  const filteredVehicles = vehicles
    .filter((v) => {
      if (selectedCategory !== 'all' && v.category !== selectedCategory) return false;
      if (searchLocation !== 'todos' && v.locationZone !== searchLocation) return false;
      if (
        searchQuery &&
        !v.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !v.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortOption === 'price-desc') return b.pricePerDay - a.pricePerDay;
      return b.host.rating - a.host.rating;
    });

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f3f0] to-[#fbf9f6] py-16 lg:py-20 border-b border-[#cec5bc]/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede9e3] text-[#755a2a] text-[11px] font-semibold uppercase tracking-[0.15em]">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              Flota Privada Seleccionada
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#15110d] leading-[1.15]">
              Movilidad privada <br />
              <span className="italic font-light text-[#755a2a]">sin compromisos.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#5d564e] font-sans leading-relaxed max-w-2xl">
              Alquiler directo entre propietarios seleccionados y miembros calificados. Cada unidad es entregada con rigurosa inspección técnica, póliza Todo Riesgo y atención concierge personal.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="mt-10 bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(42,38,33,0.08)] border border-[#cec5bc]/40 p-4 lg:p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Ubicación */}
              <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-[#ece8e2]">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                  Ubicación de Retiro
                </label>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#755a2a]">pin_drop</span>
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-transparent text-[14px] font-medium text-[#1b1c1a] focus:outline-none cursor-pointer"
                  >
                    <option value="todos">Toda la Ciudad (CABA y GBA)</option>
                    <option value="recoleta">Recoleta, CABA</option>
                    <option value="palermo">Palermo, CABA</option>
                    <option value="belgrano">Belgrano, CABA</option>
                    <option value="puerto-madero">Puerto Madero, CABA</option>
                    <option value="san-isidro">San Isidro / Zona Norte</option>
                  </select>
                </div>
              </div>

              {/* Fecha Inicio */}
              <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-[#ece8e2]">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                  Fecha de Retiro
                </label>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#755a2a]">calendar_today</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent text-[14px] font-medium text-[#1b1c1a] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Fecha Devolución */}
              <div className="px-3 py-1 border-b md:border-b-0 md:border-r border-[#ece8e2]">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                  Fecha de Devolución
                </label>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#755a2a]">event_available</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-transparent text-[14px] font-medium text-[#1b1c1a] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="px-1">
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full h-12 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                  Explorar Flota
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        {/* Category Filter Chips & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#cec5bc]/30">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#15110d] text-white shadow-sm'
                      : 'bg-[#f5f3f0] text-[#5d564e] hover:bg-[#eae8e5] hover:text-[#15110d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#7d766e] uppercase font-bold tracking-wider hidden sm:inline">
              Ordenar por:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-[#f5f3f0] border border-[#cec5bc]/40 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#1b1c1a] focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recomendados / Mejor calificados</option>
              <option value="price-asc">Menor precio diario</option>
              <option value="price-desc">Mayor precio diario</option>
            </select>
          </div>
        </div>

        {/* Results summary count */}
        <div className="py-6 flex items-center justify-between text-[13px] text-[#7d766e]">
          <span>
            Mostrando <strong className="text-[#15110d]">{filteredVehicles.length}</strong> vehículos disponibles con entrega inmediata
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#755a2a] font-semibold text-[12px]">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            Todos los viajes asegurados por Zurich Seguros
          </span>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#cec5bc]/40 shadow-[0_2px_12px_rgba(42,38,33,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(42,38,33,0.12)] transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Badges */}
              <div
                className="relative aspect-[16/10] overflow-hidden bg-[#e5e0da] cursor-pointer"
                onClick={() => onSelectVehicle(vehicle)}
              >
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category / Badge Pill */}
                {vehicle.badge && (
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#15110d]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {vehicle.badge}
                  </div>
                )}

                {/* Host Rating Pill */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#15110d] text-[11px] font-bold flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-[#d49727]">star</span>
                  <span>{vehicle.host.rating.toFixed(1)}</span>
                  <span className="text-[10px] font-normal text-[#7d766e]">({vehicle.host.deliveriesCount})</span>
                </div>

                {/* Bottom photo counter indicator */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">photo_camera</span>
                  {vehicle.images.length} fotos
                </div>
              </div>

              {/* Vehicle Body Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#755a2a] mb-1.5">
                    <span>{vehicle.categoryLabel}</span>
                    <span className="text-[#7d766e] font-normal flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {vehicle.location}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectVehicle(vehicle)}
                    className="font-serif text-[19px] font-medium text-[#15110d] leading-snug hover:text-[#755a2a] transition-colors cursor-pointer line-clamp-1"
                  >
                    {vehicle.name}
                  </h3>

                  <p className="mt-2 text-[12px] text-[#6d665f] line-clamp-2 leading-relaxed font-sans">
                    {vehicle.description}
                  </p>
                </div>

                {/* Key specs pills */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#ece8e2] text-[11px] text-[#4b463f]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#7d766e]">settings</span>
                    <span className="truncate">{vehicle.transmission.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#7d766e]">group</span>
                    <span>{vehicle.seats} plazas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#7d766e]">local_gas_station</span>
                    <span className="truncate">{vehicle.fuel.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Price & CTA Action */}
                <div className="flex items-end justify-between pt-1">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-[#7d766e]">
                      Tarifa Diaria
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-[22px] font-semibold text-[#15110d]">
                        ${vehicle.pricePerDay.toLocaleString('es-AR')}
                      </span>
                      <span className="text-[12px] text-[#7d766e]">/ día</span>
                    </div>
                    {vehicle.discountNote && (
                      <span className="text-[10px] text-[#2b7a4b] font-semibold">
                        {vehicle.discountNote}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectVehicle(vehicle)}
                      className="px-3.5 py-2.5 rounded-lg border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[12px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Detalle
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickBook(vehicle)}
                      className="px-4 py-2.5 rounded-lg bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Concierge Assurance Strip */}
        <section className="mt-20 bg-[#f5f3f0] rounded-2xl p-8 lg:p-10 border border-[#cec5bc]/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0 text-[#755a2a]">
                <span className="material-symbols-outlined text-[24px]">key</span>
              </div>
              <div>
                <h4 className="font-serif text-[16px] font-semibold text-[#15110d]">
                  Entrega Concierge en Mano
                </h4>
                <p className="text-[12px] text-[#6d665f] mt-1 leading-relaxed">
                  Reciba el vehículo higienizado y con tanque completo en su residencia, hotel o helipuerto con total puntualidad.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0 text-[#755a2a]">
                <span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
              </div>
              <div>
                <h4 className="font-serif text-[16px] font-semibold text-[#15110d]">
                  Cobertura Todo Riesgo
                </h4>
                <p className="text-[12px] text-[#6d665f] mt-1 leading-relaxed">
                  Póliza premium que cubre daños materiales, robo y responsabilidad civil con asistencia mecánica exclusiva 24/7.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0 text-[#755a2a]">
                <span className="material-symbols-outlined text-[24px]">badge</span>
              </div>
              <div>
                <h4 className="font-serif text-[16px] font-semibold text-[#15110d]">
                  Privacidad y Verificación
                </h4>
                <p className="text-[12px] text-[#6d665f] mt-1 leading-relaxed">
                  Conductores y propietarios verificados bajo estrictos acuerdos de confidencialidad para su absoluta tranquilidad.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
