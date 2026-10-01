import React, { useState } from 'react';
import { Vehicle, NavigationTab } from '../types/index.ts';

interface CreateListingScreenProps {
  vehicles: Vehicle[];
  onNavigate: (tab: NavigationTab) => void;
  onPublishListing: (publishedVehicle: Vehicle) => void;
}

export const CreateListingScreen: React.FC<CreateListingScreenProps> = ({
  vehicles,
  onNavigate,
  onPublishListing,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || '');
  const [pricePerDay, setPricePerDay] = useState(85000);
  const [weeklyDiscount, setWeeklyDiscount] = useState(10);
  const [refundableDeposit, setRefundableDeposit] = useState(150000);
  const [dailyKmLimit, setDailyKmLimit] = useState('250 km / día');
  const [deliveryPoint, setDeliveryPoint] = useState('Cochera en Recoleta, CABA');
  const [allowDeliveryAtAddress, setAllowDeliveryAtAddress] = useState(true);
  const [ruleSmoking, setRuleSmoking] = useState(false);
  const [rulePets, setRulePets] = useState(false);
  const [ruleFullTank, setRuleFullTank] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const updated: Vehicle = {
        ...selectedVehicle,
        pricePerDay,
        deliveryAddress: deliveryPoint,
        status: 'active',
      };
      onPublishListing(updated);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="pb-6 border-b border-[#cec5bc]/30">
          <button
            onClick={() => onNavigate('mis-publicaciones')}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#7d766e] hover:text-[#15110d] mb-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Volver a Publicaciones
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#15110d] tracking-tight">
            Publicar Vehículo en Catálogo
          </h1>
          <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
            Defina la tarifa diaria, políticas de entrega y normas de uso para su unidad.
          </p>
        </div>

        {/* 2-Columns: Form (7 cols) + Sticky Preview (5 cols) */}
        <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-8">
          {/* Left: Settings */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Vehicle */}
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                1. Selección de Unidad Registrada
              </h3>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e]">
                  Seleccione el vehículo a poner en alquiler
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[13px] font-semibold text-[#1b1c1a] focus:outline-none cursor-pointer"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.plate}) — {v.categoryLabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('registrar-vehiculo')}
                  className="text-[11px] text-[#755a2a] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  ¿Desea registrar una unidad diferente?
                </button>
              </div>
            </div>

            {/* Step 2: Pricing & Discounts */}
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/40 shadow-xs space-y-5">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                2. Tarifas y Depósito en Garantía
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Tarifa Diaria (ARS)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-[#7d766e] font-semibold">$</span>
                    <input
                      type="number"
                      step={1000}
                      value={pricePerDay}
                      onChange={(e) => setPricePerDay(Number(e.target.value))}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-semibold text-[#1b1c1a] focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-[#7d766e] mt-1 block">
                    Tarifa sugerida por Volanta para este segmento: $75.000 - $95.000
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Descuento por 7+ Días (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={weeklyDiscount}
                      onChange={(e) => setWeeklyDiscount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-semibold text-[#1b1c1a] focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-[#7d766e] font-semibold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Depósito en Garantía Reembolsable
                  </label>
                  <input
                    type="number"
                    step={10000}
                    value={refundableDeposit}
                    onChange={(e) => setRefundableDeposit(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-semibold text-[#1b1c1a] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#7d766e] mt-1 block">
                    Retenido temporalmente por tarjeta del cliente
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Límite de Kilometraje Diario
                  </label>
                  <select
                    value={dailyKmLimit}
                    onChange={(e) => setDailyKmLimit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-semibold text-[#1b1c1a] focus:outline-none cursor-pointer"
                  >
                    <option value="200 km / día">200 km / día</option>
                    <option value="250 km / día">250 km / día (Recomendado)</option>
                    <option value="350 km / día">350 km / día</option>
                    <option value="Kilometraje Ilimitado">Kilometraje Ilimitado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Location & Delivery */}
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                3. Punto de Entrega Habitual
              </h3>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                  Dirección o Garaje de Retiro
                </label>
                <input
                  type="text"
                  value={deliveryPoint}
                  onChange={(e) => setDeliveryPoint(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[13px] text-[#1b1c1a] focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2.5 text-[12px] text-[#4b463f] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowDeliveryAtAddress}
                    onChange={(e) => setAllowDeliveryAtAddress(e.target.checked)}
                    className="accent-[#755a2a]"
                  />
                  <span>
                    Acepto ofrecer servicio de entrega a domicilio o aeropuertos mediante el servicio Concierge de Volanta (con arancel extra al cliente).
                  </span>
                </label>
              </div>
            </div>

            {/* Step 4: Rules of Conduct */}
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                4. Reglas del Vehículo
              </h3>

              <div className="space-y-3 text-[13px] text-[#4b463f]">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3f0] cursor-pointer">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#7d766e]">smoke_free</span>
                    Prohibido Fumar o vapear en el habitáculo
                  </span>
                  <input
                    type="checkbox"
                    checked={!ruleSmoking}
                    onChange={(e) => setRuleSmoking(!e.target.checked)}
                    className="accent-[#755a2a]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3f0] cursor-pointer">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#7d766e]">pets</span>
                    Mascotas permitidas
                  </span>
                  <input
                    type="checkbox"
                    checked={rulePets}
                    onChange={(e) => setRulePets(e.target.checked)}
                    className="accent-[#755a2a]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3f0] cursor-pointer">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#7d766e]">local_gas_station</span>
                    Devolución con tanque completo
                  </span>
                  <input
                    type="checkbox"
                    checked={ruleFullTank}
                    onChange={(e) => setRuleFullTank(e.target.checked)}
                    className="accent-[#755a2a]"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#15110d] hover:bg-[#2a2621] disabled:bg-[#7d766e] text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  Publicando en Catálogo...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  Confirmar y Publicar en Volanta
                </>
              )}
            </button>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#755a2a] block">
              Vista en Catálogo Público
            </span>

            {selectedVehicle && (
              <div className="bg-white rounded-2xl overflow-hidden border border-[#cec5bc]/50 shadow-md">
                <div className="aspect-[16/10] bg-[#e5e0da] relative">
                  <img
                    src={selectedVehicle.images[0]}
                    alt={selectedVehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#15110d]/85 text-white text-[10px] font-bold uppercase tracking-wider">
                    {selectedVehicle.categoryLabel}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                    {selectedVehicle.images.length} fotos
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[11px] text-[#755a2a] font-bold uppercase tracking-wider block">
                      {selectedVehicle.location}
                    </span>
                    <h3 className="font-serif text-[20px] font-medium text-[#15110d]">
                      {selectedVehicle.name}
                    </h3>
                  </div>

                  <div className="py-3 border-y border-[#ece8e2] flex justify-between items-baseline">
                    <div>
                      <span className="text-[10px] text-[#7d766e] uppercase font-bold block">Tarifa fija</span>
                      <span className="font-serif text-[24px] font-bold text-[#15110d]">
                        ${pricePerDay.toLocaleString('es-AR')}
                      </span>
                      <span className="text-[12px] text-[#7d766e]"> / día</span>
                    </div>

                    {weeklyDiscount > 0 && (
                      <span className="text-[11px] font-semibold text-[#2b7a4b] bg-[#eef7f0] px-2.5 py-1 rounded-full">
                        {weeklyDiscount}% off por 7+ días
                      </span>
                    )}
                  </div>

                  <div className="text-[12px] text-[#6d665f] space-y-1">
                    <p>• Kilometraje: {dailyKmLimit}</p>
                    <p>• Depósito: ${refundableDeposit.toLocaleString('es-AR')}</p>
                    <p>• Retiro: {deliveryPoint}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
