import React, { useState } from 'react';
import { Vehicle, NavigationTab } from '../types/index.ts';

interface VehicleDetailScreenProps {
  vehicle: Vehicle;
  onNavigate: (tab: NavigationTab) => void;
  onBook: (bookingDetails: {
    vehicle: Vehicle;
    startDate: string;
    endDate: string;
    pickupTime: string;
    returnTime: string;
    days: number;
    dailyRate: number;
    discountAmount: number;
    total: number;
    deliveryAddress: string;
  }) => void;
  onOpenChat: (hostName: string, vehicleName: string) => void;
}

export const VehicleDetailScreen: React.FC<VehicleDetailScreenProps> = ({
  vehicle,
  onNavigate,
  onBook,
  onOpenChat,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startDate, setStartDate] = useState('2025-11-14');
  const [endDate, setEndDate] = useState('2025-11-17');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnTime, setReturnTime] = useState('19:00');
  const [deliveryMode, setDeliveryMode] = useState<'host-location' | 'custom-delivery'>('host-location');
  const [customAddress, setCustomAddress] = useState('');

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(end.getTime() - start.getTime(), 0);
  const days = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);

  // Pricing calculations
  const dailyRate = vehicle.pricePerDay;
  const subtotal = dailyRate * days;
  const discountRate = days >= 7 ? 0.1 : days >= 5 ? 0.05 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const deliveryFee = deliveryMode === 'custom-delivery' ? 15000 : 0;
  const refundableDeposit = 150000;
  const total = subtotal - discountAmount + deliveryFee;

  const handleStartBooking = () => {
    onBook({
      vehicle,
      startDate,
      endDate,
      pickupTime,
      returnTime,
      days,
      dailyRate,
      discountAmount,
      total,
      deliveryAddress: deliveryMode === 'custom-delivery' ? customAddress || 'Domicilio del cliente' : vehicle.deliveryAddress,
    });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
        <nav className="flex items-center gap-2 text-[12px] text-[#7d766e] uppercase tracking-wider font-semibold">
          <button
            onClick={() => onNavigate('explorar')}
            className="hover:text-[#15110d] transition-colors cursor-pointer"
          >
            Catálogo
          </button>
          <span>/</span>
          <span>{vehicle.brand}</span>
          <span>/</span>
          <span className="text-[#15110d] truncate">{vehicle.model}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Title & Badges */}
        <div className="pb-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#15110d] text-white text-[11px] font-bold uppercase tracking-wider">
              {vehicle.categoryLabel}
            </span>
            {vehicle.badge && (
              <span className="px-3 py-1 rounded-full bg-[#ede9e3] text-[#755a2a] text-[11px] font-bold uppercase tracking-wider">
                {vehicle.badge}
              </span>
            )}
            <span className="text-[12px] text-[#7d766e] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#755a2a]">location_on</span>
              {vehicle.location}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#15110d] tracking-tight">
            {vehicle.name}
          </h1>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-4 mb-12">
          {/* Featured Image */}
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-[#e5e0da] cursor-pointer group shadow-sm"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={vehicle.images[selectedImageIndex] || vehicle.images[0]}
              alt={vehicle.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <button
              type="button"
              className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md text-white text-[12px] font-semibold flex items-center gap-2 hover:bg-black/85 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              Ver galería en pantalla completa ({vehicle.images.length} fotos)
            </button>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 overflow-x-auto pb-1">
            {vehicle.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImageIndex === idx
                    ? 'border-[#755a2a] scale-98 shadow-sm'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Detalle ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout: Details on Left, Sticky Booking on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Specs, Description, Host, Rules (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            {/* Technical Specifications Grid */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs">
              <h2 className="font-serif text-[20px] font-semibold text-[#15110d] mb-6">
                Ficha Técnica &amp; Equipamiento
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-[13px]">
                <div className="p-3.5 rounded-xl bg-[#f5f3f0]/70 border border-[#ece8e2]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block mb-1">
                    Transmisión
                  </span>
                  <div className="font-semibold text-[#15110d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#755a2a]">settings</span>
                    {vehicle.transmission}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f5f3f0]/70 border border-[#ece8e2]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block mb-1">
                    Tracción
                  </span>
                  <div className="font-semibold text-[#15110d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#755a2a]">all_inclusive</span>
                    {vehicle.traction}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f5f3f0]/70 border border-[#ece8e2]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block mb-1">
                    Combustible
                  </span>
                  <div className="font-semibold text-[#15110d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#755a2a]">local_gas_station</span>
                    {vehicle.fuel}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f5f3f0]/70 border border-[#ece8e2]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block mb-1">
                    Capacidad Baúl
                  </span>
                  <div className="font-semibold text-[#15110d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#755a2a]">luggage</span>
                    {vehicle.trunkCapacity}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f5f3f0]/70 border border-[#ece8e2]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block mb-1">
                    Plazas
                  </span>
                  <div className="font-semibold text-[#15110d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#755a2a]">airline_seat_recline_extra</span>
                    {vehicle.seats} Pasajeros
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f5f3f0]/70 border border-[#ece8e2]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block mb-1">
                    Autonomía estimada
                  </span>
                  <div className="font-semibold text-[#15110d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#755a2a]">speed</span>
                    {vehicle.autonomy}
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h2 className="font-serif text-[20px] font-semibold text-[#15110d]">
                Sobre esta unidad
              </h2>
              <p className="text-[14px] text-[#4b463f] leading-relaxed font-sans whitespace-pre-line">
                {vehicle.description}
              </p>
              <div className="pt-4 border-t border-[#ece8e2] flex flex-wrap items-center gap-4 text-[12px] text-[#6d665f]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#2b7a4b]">check_circle</span>
                  <span>Mantenimiento Oficial al día</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#2b7a4b]">check_circle</span>
                  <span>Higienizado y descontaminado con ozono</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#2b7a4b]">check_circle</span>
                  <span>Cédula y VTV verificadas</span>
                </div>
              </div>
            </section>

            {/* Host Card */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#15110d] text-white flex items-center justify-center font-serif text-[20px] font-semibold">
                    {vehicle.host.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                        {vehicle.host.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-[#ede9e3] text-[#755a2a] text-[10px] font-bold uppercase tracking-wider">
                        {vehicle.host.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#6d665f] mt-1">
                      <span className="flex items-center gap-1 font-semibold text-[#15110d]">
                        <span className="material-symbols-outlined text-[15px] text-[#d49727]">star</span>
                        {vehicle.host.rating.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span>{vehicle.host.deliveriesCount} entregas completadas</span>
                      <span>•</span>
                      <span className="text-[#2b7a4b] font-medium">Responde en &lt; 15 min</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChat(vehicle.host.name, vehicle.name)}
                  className="px-4 py-2.5 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer w-full sm:w-auto justify-center"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Contactar Anfitrión
                </button>
              </div>
            </section>

            {/* Delivery Point & Coordination */}
            <section className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h2 className="font-serif text-[20px] font-semibold text-[#15110d]">
                Punto de Entrega &amp; Políticas
              </h2>
              <div className="space-y-3 text-[13px] text-[#4b463f]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#755a2a] mt-0.5">location_on</span>
                  <div>
                    <strong className="text-[#15110d] block">Punto habitual del anfitrión:</strong>
                    <span>{vehicle.deliveryAddress}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#755a2a] mt-0.5">schedule</span>
                  <div>
                    <strong className="text-[#15110d] block">Ventana horaria de retiro y entrega:</strong>
                    <span>{vehicle.pickupWindow} / {vehicle.returnWindow}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#755a2a] mt-0.5">verified_user</span>
                  <div>
                    <strong className="text-[#15110d] block">Requisitos del Conductor:</strong>
                    <span>Licencia de conducir vigente (mínimo 2 años de antigüedad), mayor de 25 años y DNI o pasaporte internacional verificado.</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Widget (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/50 shadow-[0_16px_40px_-12px_rgba(42,38,33,0.1)] space-y-6">
              {/* Daily Rate Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-[#ece8e2]">
                <div>
                  <span className="font-serif text-[28px] font-semibold text-[#15110d]">
                    ${vehicle.pricePerDay.toLocaleString('es-AR')}
                  </span>
                  <span className="text-[13px] text-[#7d766e] font-sans"> / día</span>
                </div>
                <span className="text-[11px] font-semibold text-[#2b7a4b] bg-[#eef7f0] px-2.5 py-1 rounded-full">
                  Disponibilidad Inmediata
                </span>
              </div>

              {/* Date & Time Selectors */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#ece8e2]">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Retiro
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-transparent text-[12px] font-semibold text-[#1b1c1a] focus:outline-none cursor-pointer"
                    />
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full mt-1.5 bg-transparent text-[11px] text-[#5d564e] border-t border-[#ece8e2] pt-1 focus:outline-none cursor-pointer"
                    >
                      <option value="09:00">09:00 hs</option>
                      <option value="10:00">10:00 hs</option>
                      <option value="12:00">12:00 hs</option>
                      <option value="15:00">15:00 hs</option>
                      <option value="18:00">18:00 hs</option>
                    </select>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#f5f3f0] border border-[#ece8e2]">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Devolución
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-transparent text-[12px] font-semibold text-[#1b1c1a] focus:outline-none cursor-pointer"
                    />
                    <select
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-full mt-1.5 bg-transparent text-[11px] text-[#5d564e] border-t border-[#ece8e2] pt-1 focus:outline-none cursor-pointer"
                    >
                      <option value="10:00">10:00 hs</option>
                      <option value="14:00">14:00 hs</option>
                      <option value="19:00">19:00 hs</option>
                      <option value="21:00">21:00 hs</option>
                    </select>
                  </div>
                </div>

                {/* Delivery Mode Choice */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-2">
                    Modalidad de entrega
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('host-location')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        deliveryMode === 'host-location'
                          ? 'border-[#15110d] bg-[#15110d] text-white'
                          : 'border-[#cec5bc]/60 bg-[#f5f3f0] text-[#5d564e] hover:bg-[#eae8e5]'
                      }`}
                    >
                      <span className="font-semibold block">En garaje anfitrión</span>
                      <span className="text-[10px] opacity-80">Sin costo extra</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMode('custom-delivery')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        deliveryMode === 'custom-delivery'
                          ? 'border-[#15110d] bg-[#15110d] text-white'
                          : 'border-[#cec5bc]/60 bg-[#f5f3f0] text-[#5d564e] hover:bg-[#eae8e5]'
                      }`}
                    >
                      <span className="font-semibold block">A domicilio / Aerop.</span>
                      <span className="text-[10px] opacity-80">+$15.000 Concierge</span>
                    </button>
                  </div>

                  {deliveryMode === 'custom-delivery' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Ej: Hotel Alvear Palace, CABA o Aeroparque"
                        value={customAddress}
                        onChange={(e) => setCustomAddress(e.target.value)}
                        className="w-full px-3 py-2 text-[12px] bg-[#f5f3f0] border border-[#cec5bc]/60 rounded-xl text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-[#ece8e2] text-[12px] text-[#5d564e]">
                <div className="flex justify-between">
                  <span>${dailyRate.toLocaleString('es-AR')} × {days} {days === 1 ? 'día' : 'días'}</span>
                  <span className="font-medium text-[#15110d]">${subtotal.toLocaleString('es-AR')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2b7a4b] font-medium">
                    <span>Descuento por estadía prolongada</span>
                    <span>-${discountAmount.toLocaleString('es-AR')}</span>
                  </div>
                )}

                {deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Servicio Concierge de Entrega</span>
                    <span className="font-medium text-[#15110d]">${deliveryFee.toLocaleString('es-AR')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Seguro Todo Riesgo Zurich
                    <span className="text-[10px] text-[#755a2a] font-bold">Bonificado</span>
                  </span>
                  <span className="line-through text-[#7d766e]">$0</span>
                </div>

                <div className="flex justify-between text-[11px] text-[#7d766e] pt-1">
                  <span>Depósito en garantía (reembolsable)</span>
                  <span>${refundableDeposit.toLocaleString('es-AR')}</span>
                </div>

                <div className="pt-3 border-t border-[#ece8e2] flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-[18px] font-semibold text-[#15110d] block">
                      Total a pagar
                    </span>
                    <span className="text-[10px] text-[#7d766e]">Impuestos y tasas incluidos</span>
                  </div>
                  <span className="font-serif text-[24px] font-bold text-[#15110d]">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleStartBooking}
                className="w-full py-3.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Solicitar Reserva Inmediata
              </button>

              <div className="text-center space-y-1">
                <span className="text-[11px] text-[#7d766e] block">
                  Cancelación gratuita hasta 48 hs antes del retiro
                </span>
                <span className="text-[11px] text-[#755a2a] font-semibold flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Pago protegido mediante Volanta Escrow
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6">
          <div className="flex justify-between items-center text-white">
            <span className="font-serif text-[16px]">
              {vehicle.name} — Foto {selectedImageIndex + 1} de {vehicle.images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4">
            <img
              src={vehicle.images[selectedImageIndex]}
              alt="Vista completa"
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {vehicle.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`w-16 h-12 rounded border-2 overflow-hidden shrink-0 cursor-pointer ${
                  selectedImageIndex === i ? 'border-[#bca27e]' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
