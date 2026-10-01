import React, { useState } from 'react';
import { Reservation, NavigationTab } from '../types/index.ts';

interface ReservationDetailScreenProps {
  reservation: Reservation;
  onNavigate: (tab: NavigationTab) => void;
  onOpenChat: (hostName: string, vehicleName: string) => void;
}

export const ReservationDetailScreen: React.FC<ReservationDetailScreenProps> = ({
  reservation,
  onNavigate,
  onOpenChat,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showQrEnlarged, setShowQrEnlarged] = useState(false);

  const handleDownloadVoucher = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      {/* Top Banner Navigation */}
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-4">
        <button
          onClick={() => onNavigate('mis-reservas')}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#7d766e] hover:text-[#15110d] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Volver a Mis Reservas
        </button>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 space-y-8">
        {/* Reservation Status Header */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#eef7f0] text-[#2b7a4b] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2b7a4b] animate-pulse"></span>
                {reservation.statusLabel}
              </span>
              <span className="font-mono text-[12px] font-bold text-[#7d766e]">
                Código: {reservation.code}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#15110d] pt-1">
              {reservation.vehicle.name}
            </h1>
            <p className="text-[13px] text-[#6d665f]">
              Período reservado: <strong className="text-[#15110d]">{reservation.periodText}</strong> ({reservation.days} {reservation.days === 1 ? 'día' : 'días'})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenChat(reservation.hostName, reservation.vehicle.name)}
              className="px-4 py-2.5 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Chat Anfitrión
            </button>
            <button
              onClick={handleDownloadVoucher}
              className="px-5 py-2.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              {downloadSuccess ? '¡Descargado!' : 'Descargar Voucher PDF'}
            </button>
          </div>
        </div>

        {/* Real-time Progress Stepper */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs">
          <h3 className="font-serif text-[18px] font-semibold text-[#15110d] mb-6">
            Estado de Coordinación del Viaje
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2">
              <div className="w-10 h-10 rounded-full bg-[#15110d] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#755a2a] block">
                  Paso 1
                </span>
                <h4 className="text-[13px] font-bold text-[#15110d]">Solicitud Enviada</h4>
                <p className="text-[11px] text-[#7d766e]">Pago validado por Volanta</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2">
              <div className="w-10 h-10 rounded-full bg-[#15110d] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#755a2a] block">
                  Paso 2
                </span>
                <h4 className="text-[13px] font-bold text-[#15110d]">Confirmado por Anfitrión</h4>
                <p className="text-[11px] text-[#7d766e]">{reservation.hostName} aceptó la fecha</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2">
              <div className="w-10 h-10 rounded-full bg-[#755a2a] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs animate-pulse">
                <span className="material-symbols-outlined text-[18px]">key</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#755a2a] block">
                  Paso 3 (Activo)
                </span>
                <h4 className="text-[13px] font-bold text-[#15110d]">Entrega y Pase Digital</h4>
                <p className="text-[11px] text-[#7d766e]">Código de retiro habilitado</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 opacity-60">
              <div className="w-10 h-10 rounded-full bg-[#eae8e5] text-[#7d766e] flex items-center justify-center font-bold text-xs shrink-0">
                <span className="material-symbols-outlined text-[18px]">flag</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7d766e] block">
                  Paso 4
                </span>
                <h4 className="text-[13px] font-bold text-[#15110d]">Devolución y Check-out</h4>
                <p className="text-[11px] text-[#7d766e]">Inspección digital final</p>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Access Pass & Details 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Digital Pass Card (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#1b1c1a] to-[#0c0a08] rounded-2xl p-7 text-white shadow-xl space-y-6 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#755a2a]/20 blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start">
              <div>
                <span className="font-serif text-[18px] tracking-[0.2em] uppercase text-white block">
                  VOLANTA
                </span>
                <span className="text-[10px] tracking-widest text-[#a8a198] uppercase">
                  Digital Boarding Pass &amp; Key Access
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-white/10 text-[#d49727] text-[10px] font-mono font-bold tracking-wider">
                VALIDADO
              </span>
            </div>

            {/* Vehicle Title & Plate */}
            <div className="py-2 border-y border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-[#a8a198] block">Unidad Asignada</span>
              <h3 className="font-serif text-[20px] font-semibold text-white">
                {reservation.vehicle.name}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-[12px] text-[#c7c0b7]">
                <span>Patente: <strong className="font-mono text-white">{reservation.vehicle.plate}</strong></span>
                <span>Color: {reservation.vehicle.color}</span>
              </div>
            </div>

            {/* QR Code & Lockbox PIN */}
            <div className="grid grid-cols-2 gap-4 items-center bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-center space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#a8a198] block">
                  Código de Llave / Lockbox
                </span>
                <div className="font-mono text-2xl font-bold tracking-widest text-[#f5f3f0] bg-white/10 py-1.5 px-3 rounded-lg inline-block">
                  {reservation.lockboxCode || '8492#'}
                </div>
                <span className="text-[10px] text-[#a8a198] block">O entregado en mano por {reservation.hostName}</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => setShowQrEnlarged(true)}>
                <div className="w-24 h-24 bg-white p-2 rounded-lg shadow-sm flex items-center justify-center">
                  {/* High fidelity SVG QR representation */}
                  <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="35" y="10" width="10" height="10" />
                    <rect x="50" y="15" width="15" height="10" />
                    <rect x="35" y="35" width="30" height="10" />
                    <rect x="40" y="50" width="10" height="20" />
                    <rect x="60" y="50" width="15" height="10" />
                    <rect x="75" y="75" width="20" height="20" />
                  </svg>
                </div>
                <span className="text-[10px] text-[#a8a198] mt-1 underline">Ampliar QR</span>
              </div>
            </div>

            {/* Location & Times info */}
            <div className="space-y-2 text-[12px] text-[#c7c0b7]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#a8a198] block">Punto de retiro:</span>
                <span className="text-white font-medium">{reservation.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a8a198] block">Inicio:</span>
                  <span className="text-white">{reservation.startDate} (10:00 hs)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a8a198] block">Devolución:</span>
                  <span className="text-white">{reservation.endDate} (19:00 hs)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Assistance & Reservation Breakdown (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Host Contact card */}
            <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                Anfitrión y Soporte Directo
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#15110d] text-white flex items-center justify-center font-bold text-sm">
                  {reservation.hostName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-[#15110d]">{reservation.hostName}</h4>
                  <p className="text-[12px] text-[#6d665f]">Teléfono privado: +54 9 11 4821-9900</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f5f3f0] border border-[#ece8e2] text-[12px] text-[#4b463f] space-y-1">
                <strong className="text-[#15110d] block">Indicaciones del Anfitrión:</strong>
                <p>
                  "El vehículo se encuentra en cochera fija número 12, piso 1. Presentar el QR o indicar código {reservation.lockboxCode || '8492#'} en recepción de seguridad."
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChat(reservation.hostName, reservation.vehicle.name)}
                  className="flex-1 py-2.5 rounded-xl bg-[#15110d] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2a2621] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  Abrir Chat Privado
                </button>
                <a
                  href="tel:+5491148219900"
                  className="px-4 py-2.5 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  Llamar
                </a>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs space-y-3">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d] pb-2 border-b border-[#ece8e2]">
                Detalle del Pago
              </h3>
              <div className="space-y-2 text-[12px] text-[#5d564e]">
                <div className="flex justify-between">
                  <span>Monto Total Abonado</span>
                  <span className="font-semibold text-[#15110d]">
                    ${reservation.totalAmount.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Método de Pago</span>
                  <span className="capitalize">{reservation.paymentMethod} (Aprobado)</span>
                </div>
                <div className="flex justify-between text-[#2b7a4b]">
                  <span>Póliza Todo Riesgo Zurich</span>
                  <span>Cubierta</span>
                </div>
                <div className="flex justify-between">
                  <span>Depósito en Garantía</span>
                  <span>Retenido temporalmente ($150.000)</span>
                </div>
              </div>
            </div>

            {/* Concierge Emergency Line */}
            <div className="bg-[#ede9e3]/60 rounded-2xl p-5 border border-[#cec5bc]/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#755a2a]">support_agent</span>
                <div>
                  <span className="font-bold text-[13px] text-[#15110d] block">
                    Concierge Volanta 24/7
                  </span>
                  <span className="text-[11px] text-[#7d766e]">
                    Asistencia inmediata en ruta, cambio de conductor o emergencias
                  </span>
                </div>
              </div>
              <a
                href="tel:08008889090"
                className="px-3 py-2 rounded-lg bg-white border border-[#cec5bc]/60 text-[11px] font-bold text-[#15110d] hover:bg-[#15110d] hover:text-white transition-colors shrink-0"
              >
                0800-888-VOLANTA
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged QR Modal */}
      {showQrEnlarged && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowQrEnlarged(false)}
        >
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-xl font-bold text-[#15110d]">Pase de Acceso Volanta</h3>
            <div className="w-56 h-56 mx-auto bg-white p-2 border border-[#cec5bc] rounded-xl flex items-center justify-center">
              <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />
                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />
                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />
                <rect x="35" y="10" width="10" height="10" />
                <rect x="50" y="15" width="15" height="10" />
                <rect x="35" y="35" width="30" height="10" />
                <rect x="40" y="50" width="10" height="20" />
                <rect x="60" y="50" width="15" height="10" />
                <rect x="75" y="75" width="20" height="20" />
              </svg>
            </div>
            <p className="font-mono text-xl font-bold text-[#755a2a]">{reservation.code}</p>
            <p className="text-[12px] text-[#6d665f]">
              Muestre este código al personal del estacionamiento o al anfitrión para validar la entrega.
            </p>
            <button
              onClick={() => setShowQrEnlarged(false)}
              className="w-full py-2.5 rounded-xl bg-[#15110d] text-white text-[12px] font-semibold uppercase tracking-wider cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
