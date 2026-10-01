import React, { useState, useEffect } from 'react';
import { CartState, NavigationTab, User } from '../types/index.ts';

interface CartScreenProps {
  cart: CartState | null;
  currentUser: User;
  onNavigate: (tab: NavigationTab) => void;
  onConfirmReservation: (confirmedData: any) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  currentUser,
  onNavigate,
  onConfirmReservation,
}) => {
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 in seconds
  const [driverName, setDriverName] = useState(`${currentUser.firstName} ${currentUser.lastName}`);
  const [driverPhone, setDriverPhone] = useState(currentUser.phone);
  const [driverDni, setDriverDni] = useState('34.892.109');
  const [driverLicense, setDriverLicense] = useState('B1-34892109-AR');
  const [notesToHost, setNotesToHost] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'credit-card' | 'transfer'>('mercadopago');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!cart) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-32 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl border border-[#cec5bc]/40 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#f5f3f0] text-[#755a2a] mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
          </div>
          <h2 className="font-serif text-2xl font-normal text-[#15110d]">
            No tienes reservas pendientes
          </h2>
          <p className="text-[13px] text-[#6d665f]">
            Explora nuestra flota de sedanes, SUVs y deportivos de alta gama y selecciona las fechas deseadas.
          </p>
          <button
            onClick={() => onNavigate('explorar')}
            className="px-6 py-3 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            Explorar Catálogo
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    if (!termsAccepted) {
      alert('Por favor acepte los términos y condiciones para continuar.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmReservation({
        cart,
        driver: {
          name: driverName,
          phone: driverPhone,
          dni: driverDni,
          license: driverLicense,
        },
        paymentMethod,
        notes: notesToHost,
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Countdown Banner */}
        <div className="mb-8 p-4 rounded-xl bg-[#15110d] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#d49727]">timer</span>
            <span className="text-[13px] font-sans">
              Vehículo bloqueado temporalmente a su nombre.
            </span>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-[#a8a198]">Tiempo restante para confirmar:</span>
            <span className="font-mono font-bold text-[#f5f3f0] bg-white/10 px-2.5 py-1 rounded">
              {formatTime(timeLeft)} min
            </span>
          </div>
        </div>

        <div className="pb-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#15110d] tracking-tight">
            Resumen de Solicitud de Reserva
          </h1>
          <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
            Revise los detalles de su viaje antes de que el propietario valide la entrega.
          </p>
        </div>

        {/* 2 columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Vehicle Card Summary */}
            <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-full sm:w-44 aspect-[16/10] rounded-xl overflow-hidden bg-[#e5e0da] shrink-0">
                <img
                  src={cart.vehicle.images[0]}
                  alt={cart.vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#755a2a] bg-[#ede9e3] px-2.5 py-0.5 rounded-full">
                    {cart.vehicle.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#7d766e]">
                    Patente: {cart.vehicle.plate}
                  </span>
                </div>

                <h3 className="font-serif text-[18px] font-semibold text-[#15110d] leading-snug">
                  {cart.vehicle.name}
                </h3>

                <div className="text-[12px] text-[#5d564e] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#755a2a]">calendar_today</span>
                    <span>
                      {cart.startDate} al {cart.endDate} ({cart.days} {cart.days === 1 ? 'día' : 'días'})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#755a2a]">schedule</span>
                    <span>
                      Retiro {cart.pickupTime} hs • Devolución {cart.returnTime} hs
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#755a2a]">location_on</span>
                    <span>{cart.vehicle.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Data Form */}
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#ece8e2]">
                <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                  Datos del Conductor Designado
                </h3>
                <span className="text-[11px] text-[#2b7a4b] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verificación Digital Activa
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc]/50 text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Teléfono móvil
                  </label>
                  <input
                    type="text"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc]/50 text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    DNI / Pasaporte
                  </label>
                  <input
                    type="text"
                    value={driverDni}
                    onChange={(e) => setDriverDni(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc]/50 text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Licencia de Conducir
                  </label>
                  <input
                    type="text"
                    value={driverLicense}
                    onChange={(e) => setDriverLicense(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc]/50 text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d] pb-2 border-b border-[#ece8e2]">
                Método de Pago Seguro
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'mercadopago'
                      ? 'border-[#755a2a] bg-[#faf7f2]'
                      : 'border-[#cec5bc]/50 hover:bg-[#f5f3f0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#009ee3]">payments</span>
                    <div>
                      <span className="font-semibold text-[13px] text-[#15110d] block">
                        Mercado Pago (Tarjetas de Débito, Crédito y Cuotas)
                      </span>
                      <span className="text-[11px] text-[#7d766e]">
                        Acreditación inmediata con protección al comprador
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'mercadopago'}
                    readOnly
                    className="accent-[#755a2a]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'credit-card'
                      ? 'border-[#755a2a] bg-[#faf7f2]'
                      : 'border-[#cec5bc]/50 hover:bg-[#f5f3f0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#15110d]">credit_card</span>
                    <div>
                      <span className="font-semibold text-[13px] text-[#15110d] block">
                        Tarjeta de Crédito Concierge (Visa Black / Amex / Master)
                      </span>
                      <span className="text-[11px] text-[#7d766e]">
                        Depósito en garantía congelado sin cobro hasta la entrega
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'credit-card'}
                    readOnly
                    className="accent-[#755a2a]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('transfer')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-[#755a2a] bg-[#faf7f2]'
                      : 'border-[#cec5bc]/50 hover:bg-[#f5f3f0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#2b7a4b]">account_balance</span>
                    <div>
                      <span className="font-semibold text-[13px] text-[#15110d] block">
                        Transferencia Bancaria Inmediata (Alias / CBU)
                      </span>
                      <span className="text-[11px] text-[#7d766e]">
                        Cuenta fiduciaria Volanta Escrow Banco Santander
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'transfer'}
                    readOnly
                    className="accent-[#755a2a]"
                  />
                </label>
              </div>
            </div>

            {/* Notes to Host */}
            <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e]">
                Mensaje o indicación especial para {cart.vehicle.host.name} (Opcional)
              </label>
              <textarea
                rows={3}
                value={notesToHost}
                onChange={(e) => setNotesToHost(e.target.value)}
                placeholder="Ej: Llego en vuelo de las 10:30 hs a Aeroparque, necesitaré el pase de estacionamiento o coordinación en terminal."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc]/50 text-[13px] text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
              />
            </div>
          </div>

          {/* Right Column: Pricing Summary & Confirmation (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#cec5bc]/50 shadow-[0_16px_40px_-12px_rgba(42,38,33,0.1)] space-y-6">
              <h3 className="font-serif text-[20px] font-semibold text-[#15110d] pb-4 border-b border-[#ece8e2]">
                Detalle Financiero
              </h3>

              <div className="space-y-3 text-[13px] text-[#5d564e]">
                <div className="flex justify-between">
                  <span>
                    ${cart.dailyRate.toLocaleString('es-AR')} × {cart.days}{' '}
                    {cart.days === 1 ? 'día' : 'días'}
                  </span>
                  <span className="font-medium text-[#15110d]">
                    ${(cart.dailyRate * cart.days).toLocaleString('es-AR')}
                  </span>
                </div>

                {cart.discountAmount > 0 && (
                  <div className="flex justify-between text-[#2b7a4b] font-medium">
                    <span>Descuento por reserva prolongada</span>
                    <span>-${cart.discountAmount.toLocaleString('es-AR')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>Seguro Todo Riesgo Franquicia Bonificada</span>
                    <span className="text-[10px] text-[#755a2a] font-bold">100% OFF</span>
                  </span>
                  <span className="font-medium text-[#2b7a4b]">$0</span>
                </div>

                <div className="flex justify-between">
                  <span>Asistencia mecánica Concierge 24/7</span>
                  <span className="font-medium text-[#2b7a4b]">Incluida</span>
                </div>

                <div className="flex justify-between text-[11px] text-[#7d766e] pt-2 border-t border-[#ece8e2]">
                  <span>Depósito en garantía retenido (se libera al finalizar)</span>
                  <span>$150.000</span>
                </div>

                <div className="pt-4 border-t border-[#ece8e2] flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-[18px] font-semibold text-[#15110d] block">
                      Total a Pagar
                    </span>
                    <span className="text-[10px] text-[#7d766e]">Impuestos aplicables incluidos</span>
                  </div>
                  <span className="font-serif text-[26px] font-bold text-[#15110d]">
                    ${cart.total.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-[12px] text-[#5d564e] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 accent-[#755a2a]"
                  />
                  <span>
                    He leído y acepto el Contrato de Comodato y Alquiler Privado Volanta, la política de seguro y el uso responsable.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirm}
                className="w-full py-4 rounded-xl bg-[#15110d] hover:bg-[#2a2621] disabled:bg-[#7d766e] text-white font-sans text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    Procesando con Banco...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Confirmar y Enviar Solicitud
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-[#7d766e] space-y-1">
                <p>El anfitrión tiene hasta 2 horas para confirmar la entrega.</p>
                <p className="text-[#755a2a] font-semibold">Si no se confirma, el dinero no se debita.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
