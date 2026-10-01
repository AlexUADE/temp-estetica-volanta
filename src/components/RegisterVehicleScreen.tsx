import React, { useState } from 'react';
import { Vehicle, NavigationTab } from '../types/index.ts';

interface RegisterVehicleScreenProps {
  onNavigate: (tab: NavigationTab) => void;
  onVehicleCreated: (vehicle: Vehicle) => void;
}

export const RegisterVehicleScreen: React.FC<RegisterVehicleScreenProps> = ({
  onNavigate,
  onVehicleCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Form Fields
  const [plate, setPlate] = useState('AF 732 KR');
  const [brand, setBrand] = useState('BMW');
  const [model, setModel] = useState('Serie 3 330i M Sport');
  const [year, setYear] = useState('2024');
  const [category, setCategory] = useState<'sedan' | 'suv' | 'pickup' | 'hatchback' | 'deportivo'>('sedan');
  const [color, setColor] = useState('Azul Portimao Metalizado');
  const [transmission, setTransmission] = useState('Steptronic Sport 8 vel.');
  const [fuel, setFuel] = useState('Nafta Premium');
  const [traction, setTraction] = useState('Trasera RWD');
  const [seats, setSeats] = useState('5');
  const [trunkCapacity, setTrunkCapacity] = useState('480 Litros');
  const [mileage, setMileage] = useState('14.200 km');
  const [vin, setVin] = useState('WBA5R71030F891234');
  const [description, setDescription] = useState(
    'Configuración M Sport con paquete aerodinámico, frenos deportivos M, suspensión adaptativa y tapizado en cuero Vernasca negro con costuras en contraste azul.'
  );

  // Step 2 documentation uploads mock states
  const [cedulaUploaded, setCedulaUploaded] = useState(true);
  const [seguroUploaded, setSeguroUploaded] = useState(true);
  const [vtvUploaded, setVtvUploaded] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Category labels map
  const categoryLabels: Record<string, string> = {
    sedan: 'Sedán Ejecutivo',
    suv: 'SUV & Híbrido',
    pickup: 'Pickup Premium',
    deportivo: 'Coupé Deportivo',
    hatchback: 'Hatchback Premium',
  };

  const sampleImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB1vW_tmgjVNqoTgTbRHy-rSt-C4FkyqrH8KQCyYjctqNZNtmSGsAWhZ6Q5ANOX6avJwydaPb1YEVikE8nDo02B5_7uhrpNd_pv-NUBFwJ5avDsBtNI6wWXqnQ0IjrpCx7Qo9WWMjy2lElKo1Xyh1ogce6LSjLeZMj7zQB5zhOruTJnu2fqlQEaGA8H-cyo8Qax28CeU1lZqM50gDmET1LKVMRZT14C8cnuCVECXjs_q7aJuRy4FsBiqA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAPr5M0htj8rEZikbaWksmZhOaqGJZMX9XI_njwJv14H_CSSHl-GRjFX7RSOAlnxpV4g7RPxYcBiqbW8BwLeWAv_lFKRThYpbxAr7abiYaK40gXzYGfhOKcdQFAtEK2UYIAikPhQLRVfj0Ty7GkJ_qJU9CwyvdsDUwk7NtV7HTs7x4rlJSN-KM7M4nxwcxJRYFLI8lUUWOzNZ56ob3i-7bjAXC2JUjUnKxZ4W1fD8XIpGzF1pVpqNqxQg',
  ];

  const handleFinishRegistration = () => {
    const newVehicle: Vehicle = {
      id: `veh_${Date.now()}`,
      name: `${brand} ${model} (${year})`,
      brand,
      model,
      year: parseInt(year) || 2024,
      category,
      categoryLabel: categoryLabels[category] || 'Vehículo de Lujo',
      badge: 'Unidad Verificada',
      pricePerDay: 88000,
      seats: parseInt(seats) || 5,
      location: 'Recoleta, CABA',
      locationZone: 'recoleta',
      color,
      transmission,
      plate,
      fuel,
      traction,
      trunkCapacity,
      autonomy: '750 km / tanque',
      description,
      images: sampleImages,
      host: {
        name: 'Ignacio L.',
        level: 'Propietario Verificado',
        rating: 5.0,
        deliveriesCount: 0,
        initials: 'IL',
      },
      deliveryAddress: 'Av. Alvear y Ayacucho, Recoleta, CABA',
      pickupWindow: 'Desde las 09:00 hs',
      returnWindow: 'Hasta las 21:00 hs',
      status: 'active',
    };

    onVehicleCreated(newVehicle);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#cec5bc]/30">
          <div>
            <button
              onClick={() => onNavigate('mis-vehiculos')}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#7d766e] hover:text-[#15110d] mb-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Volver a Mis Vehículos
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#15110d] tracking-tight">
              Registrar Nuevo Vehículo
            </h1>
            <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
              Ingrese la información técnica y documentación legal para incorporar la unidad a su flota Volanta.
            </p>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="my-8 flex items-center gap-4 border-b border-[#cec5bc]/40 pb-4">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              currentStep === 1 ? 'text-[#15110d]' : 'text-[#7d766e]'
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                currentStep === 1 ? 'bg-[#15110d] text-white' : 'bg-[#ede9e3] text-[#7d766e]'
              }`}
            >
              1
            </span>
            <span>Identificación &amp; Especificaciones</span>
          </button>

          <span className="text-[#cec5bc]">/</span>

          <button
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              currentStep === 2 ? 'text-[#15110d]' : 'text-[#7d766e]'
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                currentStep === 2 ? 'bg-[#15110d] text-white' : 'bg-[#ede9e3] text-[#7d766e]'
              }`}
            >
              2
            </span>
            <span>Documentación &amp; Legal</span>
          </button>
        </div>

        {/* 2-Columns Form on Left (7 cols), Sticky Live Preview on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs space-y-6">
                <h3 className="font-serif text-[20px] font-semibold text-[#15110d] pb-2 border-b border-[#ece8e2]">
                  1. Datos de Identificación
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Patente / Matrícula
                    </label>
                    <input
                      type="text"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value.toUpperCase())}
                      placeholder="Ej: AF 904 MM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-mono font-bold text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Marca
                    </label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none focus:border-[#15110d] cursor-pointer"
                    >
                      <option value="Audi">Audi</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Land Rover">Land Rover</option>
                      <option value="Volvo">Volvo</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Lexus">Lexus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Modelo y Versión
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Ej: A4 2.0 TFSI Quattro"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Año de Fabricación
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none cursor-pointer"
                    >
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Categoría
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none cursor-pointer"
                    >
                      <option value="sedan">Sedán Ejecutivo</option>
                      <option value="suv">SUV &amp; Híbrido</option>
                      <option value="pickup">Pickup Premium</option>
                      <option value="deportivo">Coupé Deportivo</option>
                      <option value="hatchback">Hatchback Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Color de Carrocería
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="Ej: Gris Daytona Perlado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none focus:border-[#15110d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Transmisión
                    </label>
                    <input
                      type="text"
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Combustible
                    </label>
                    <select
                      value={fuel}
                      onChange={(e) => setFuel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none cursor-pointer"
                    >
                      <option value="Nafta Premium">Nafta Premium</option>
                      <option value="Híbrido Auto-recargable">Híbrido Auto-recargable</option>
                      <option value="Eléctrico 100%">Eléctrico 100%</option>
                      <option value="Diésel Euro">Diésel Euro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Tracción
                    </label>
                    <input
                      type="text"
                      value={traction}
                      onChange={(e) => setTraction(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                      Kilometraje Actual
                    </label>
                    <input
                      type="text"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-medium text-[#1b1c1a] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Número de Chasis (VIN)
                  </label>
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] font-mono text-[12px] text-[#1b1c1a] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7d766e] mb-1">
                    Descripción y Equipamiento Destacado
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3f0] border border-[#cec5bc] text-[13px] text-[#1b1c1a] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Continuar a Validación Legal (Paso 2)</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#cec5bc]/40 shadow-xs space-y-6">
                <h3 className="font-serif text-[20px] font-semibold text-[#15110d] pb-2 border-b border-[#ece8e2]">
                  2. Documentación Legal Requerida
                </h3>
                <p className="text-[13px] text-[#6d665f]">
                  Los documentos son revisados y cotejados por el equipo legal y de seguridad de Volanta antes de habilitar el vehículo en el catálogo público.
                </p>

                {/* Upload item 1: Cédula */}
                <div className="p-4 rounded-xl border border-[#cec5bc]/50 bg-[#f5f3f0]/50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px] text-[#755a2a]">credit_card</span>
                    <div>
                      <strong className="text-[13px] text-[#15110d] block">
                        Cédula de Identificación (Verde o Azul)
                      </strong>
                      <span className="text-[11px] text-[#2b7a4b] font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        Documento cargado correctamente ({plate}.pdf)
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCedulaUploaded(!cedulaUploaded)}
                    className="text-[11px] text-[#755a2a] underline font-semibold cursor-pointer"
                  >
                    {cedulaUploaded ? 'Reemplazar' : 'Cargar'}
                  </button>
                </div>

                {/* Upload item 2: Póliza Todo Riesgo */}
                <div className="p-4 rounded-xl border border-[#cec5bc]/50 bg-[#f5f3f0]/50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px] text-[#755a2a]">shield</span>
                    <div>
                      <strong className="text-[13px] text-[#15110d] block">
                        Póliza de Seguro Vigente (Todo Riesgo)
                      </strong>
                      <span className="text-[11px] text-[#2b7a4b] font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        Póliza Zurich vigente hasta Dic 2026
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSeguroUploaded(!seguroUploaded)}
                    className="text-[11px] text-[#755a2a] underline font-semibold cursor-pointer"
                  >
                    {seguroUploaded ? 'Reemplazar' : 'Cargar'}
                  </button>
                </div>

                {/* Upload item 3: VTV / RTO */}
                <div className="p-4 rounded-xl border border-[#cec5bc]/50 bg-[#f5f3f0]/50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px] text-[#755a2a]">build</span>
                    <div>
                      <strong className="text-[13px] text-[#15110d] block">
                        Constancia de VTV / RTO Aprobada
                      </strong>
                      <span className="text-[11px] text-[#2b7a4b] font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        VTV verificada con vigencia mínima de 6 meses
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVtvUploaded(!vtvUploaded)}
                    className="text-[11px] text-[#755a2a] underline font-semibold cursor-pointer"
                  >
                    {vtvUploaded ? 'Reemplazar' : 'Cargar'}
                  </button>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-[12px] text-[#5d564e] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 accent-[#755a2a]"
                    />
                    <span>
                      Declaro bajo juramento que soy titular legal o mandatario expreso de esta unidad y que se encuentra en perfectas condiciones mecánicas y de seguridad vial.
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-3 rounded-xl border border-[#cec5bc] text-[#5d564e] text-[12px] font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Atrás
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishRegistration}
                    className="flex-1 py-3.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Registrar y Continuar a Fotos
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Live Preview on Right (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#755a2a] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2b7a4b]"></span>
              Vista Previa en Tiempo Real
            </span>

            <div className="bg-white rounded-2xl overflow-hidden border border-[#cec5bc]/50 shadow-md">
              <div className="aspect-[16/10] bg-[#e5e0da] relative">
                <img
                  src={sampleImages[0]}
                  alt="Live preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#15110d]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {categoryLabels[category] || 'Vehículo'}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-[#15110d] text-[11px] font-bold">
                  {plate || 'PATENTE'}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[11px] text-[#755a2a] font-bold uppercase tracking-wider">
                    {brand} • {year}
                  </span>
                  <h4 className="font-serif text-[20px] font-semibold text-[#15110d] leading-snug">
                    {brand} {model} ({year})
                  </h4>
                  <p className="text-[12px] text-[#6d665f] line-clamp-2 mt-1">
                    {description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#ece8e2] text-[11px] text-[#4b463f]">
                  <div>
                    <span className="text-[#7d766e] block text-[9px] uppercase font-bold">Transmisión</span>
                    <span className="truncate block font-medium">{transmission.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[#7d766e] block text-[9px] uppercase font-bold">Color</span>
                    <span className="truncate block font-medium">{color}</span>
                  </div>
                  <div>
                    <span className="text-[#7d766e] block text-[9px] uppercase font-bold">Combustible</span>
                    <span className="truncate block font-medium">{fuel.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-[#7d766e] uppercase font-bold block">Tarifa estimada</span>
                    <span className="font-serif text-[20px] font-bold text-[#15110d]">$88.000 / día</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#ede9e3] text-[#755a2a] text-[10px] font-bold uppercase tracking-wider">
                    Verificando
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
