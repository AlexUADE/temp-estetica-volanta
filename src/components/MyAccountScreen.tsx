import React, { useState } from 'react';
import { User, NavigationTab } from '../types/index.ts';

interface MyAccountScreenProps {
  user: User;
  onNavigate: (tab: NavigationTab) => void;
}

export const MyAccountScreen: React.FC<MyAccountScreenProps> = ({ user, onNavigate }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="pb-8 border-b border-[#cec5bc]/30">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#15110d] tracking-tight">
            Mi Perfil &amp; Credenciales Concierge
          </h1>
          <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
            Gestione sus datos de socio, documentos de conducción y preferencias de seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
          {/* Left: Profile Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs space-y-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#15110d] text-white mx-auto flex items-center justify-center font-serif text-2xl font-bold">
              {firstName.charAt(0)}{lastName.charAt(0)}
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-[#15110d]">
                {firstName} {lastName}
              </h3>
              <span className="text-[12px] text-[#755a2a] font-semibold block mt-0.5">
                Socio Titular Volanta Club
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#2b7a4b] bg-[#eef7f0] px-2.5 py-0.5 rounded-full mt-2 font-medium">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                Identidad Verificada
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f3f0] text-left text-[12px] space-y-2 border border-[#ece8e2]">
              <div className="flex justify-between">
                <span className="text-[#7d766e]">Licencia:</span>
                <span className="font-mono font-bold text-[#15110d]">B.1 (CABA)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7d766e]">Vigencia:</span>
                <span className="font-semibold text-[#2b7a4b]">Nov 2027</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7d766e]">Score Volanta:</span>
                <span className="font-bold text-[#15110d]">5.0 / 5.0 ★</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('mis-reservas')}
                className="w-full py-2.5 px-3 rounded-xl border border-[#cec5bc] hover:border-[#15110d] text-[#15110d] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Ver Mis Reservas
              </button>
              <button
                type="button"
                onClick={() => onNavigate('mis-publicaciones')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#15110d] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#2a2621] transition-colors cursor-pointer"
              >
                Panel de Propietario
              </button>
            </div>
          </div>

          {/* Right: Personal Data Form & Payments (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs space-y-6">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d] pb-2 border-b border-[#ece8e2]">
                Información Personal
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[#1b1c1a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[#1b1c1a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[#1b1c1a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Teléfono Móvil
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[#1b1c1a] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
                >
                  Guardar Cambios
                </button>
                {savedSuccess && (
                  <span className="text-[12px] text-[#2b7a4b] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Datos actualizados con éxito
                  </span>
                )}
              </div>
            </form>

            {/* Saved Payment Methods */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-[18px] font-semibold text-[#15110d] pb-2 border-b border-[#ece8e2]">
                Métodos de Pago Vinculados
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#cec5bc]/50 bg-[#f5f3f0]/50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px] text-[#15110d]">credit_card</span>
                    <div>
                      <span className="font-semibold text-[13px] text-[#15110d] block">
                        Visa Signature •••• 4821
                      </span>
                      <span className="text-[11px] text-[#7d766e]">Expira 08/28</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ede9e3] text-[#755a2a] text-[10px] font-bold uppercase tracking-wider">
                    Predeterminada
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#cec5bc]/50 bg-[#f5f3f0]/50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px] text-[#009ee3]">account_balance_wallet</span>
                    <div>
                      <span className="font-semibold text-[13px] text-[#15110d] block">
                        Cuenta Mercado Pago (alexymrlz@gmail.com)
                      </span>
                      <span className="text-[11px] text-[#2b7a4b]">Vinculada y Verificada</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#7d766e]">Activa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
