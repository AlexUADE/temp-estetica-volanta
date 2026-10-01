import React, { useState } from 'react';
import { Vehicle, NavigationTab } from '../types/index.ts';
import { galleryPhotosList } from '../data/mockData.ts';

interface PhotoManagementScreenProps {
  vehicle: Vehicle;
  onNavigate: (tab: NavigationTab) => void;
  onSavePhotos: (photos: any[]) => void;
}

export const PhotoManagementScreen: React.FC<PhotoManagementScreenProps> = ({
  vehicle,
  onNavigate,
  onSavePhotos,
}) => {
  const [photos, setPhotos] = useState(galleryPhotosList);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSetCover = (id: string) => {
    setPhotos(
      photos.map((p) => ({
        ...p,
        isCover: p.id === id,
      }))
    );
  };

  const handleSave = () => {
    setSaveSuccess(true);
    onSavePhotos(photos);
    setTimeout(() => {
      setSaveSuccess(false);
      onNavigate('mis-vehiculos');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] pt-24 pb-24">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#cec5bc]/30">
          <div>
            <button
              onClick={() => onNavigate('mis-vehiculos')}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#7d766e] hover:text-[#15110d] mb-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Volver a Mis Vehículos
            </button>
            <h1 className="font-serif text-3xl font-normal text-[#15110d]">
              Gestión de Fotografías: {vehicle.name}
            </h1>
            <p className="text-[13px] text-[#6d665f] mt-1 font-sans">
              8 ángulos obligatorios según el estándar de catálogo Volanta. Calidad mínima requerida: 2400px de ancho.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            {saveSuccess ? '¡Guardado con Éxito!' : 'Guardar y Publicar Fotos'}
          </button>
        </div>

        {/* 2-Columns: 8-Photo Grid on Left (8 cols), Guidelines on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
          {/* Photo slots grid (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all ${
                    photo.isCover
                      ? 'border-[#755a2a] shadow-md ring-2 ring-[#755a2a]/20'
                      : 'border-[#cec5bc]/40 shadow-xs'
                  }`}
                >
                  {/* Photo Viewer */}
                  <div className="aspect-[16/10] bg-[#e5e0da] relative group overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Tag Number */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[11px] font-bold">
                      {photo.indexTag}
                    </div>

                    {/* Cover Badge */}
                    {photo.isCover && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#755a2a] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">star</span>
                        Portada Principal
                      </div>
                    )}

                    {/* Resolution Tag */}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono">
                      {photo.resolution}
                    </div>
                  </div>

                  {/* Meta & Actions */}
                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#755a2a] block">
                        Ángulo {photo.indexTag}
                      </span>
                      <h4 className="font-serif text-[16px] font-medium text-[#15110d]">
                        {photo.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#ece8e2] text-[11px]">
                      {!photo.isCover ? (
                        <button
                          type="button"
                          onClick={() => handleSetCover(photo.id)}
                          className="text-[#755a2a] hover:text-[#15110d] font-semibold cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px]">favorite_border</span>
                          Definir como Portada
                        </button>
                      ) : (
                        <span className="text-[#2b7a4b] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">check_circle</span>
                          Portada activa
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="text-[#5d564e] hover:text-[#15110d] cursor-pointer"
                          title="Reemplazar archivo"
                        >
                          Reemplazar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines on Right (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#cec5bc]/40 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#ece8e2]">
                <h3 className="font-serif text-[18px] font-semibold text-[#15110d]">
                  Guía de Calidad Volanta
                </h3>
                <span className="text-[11px] font-bold text-[#2b7a4b] bg-[#eef7f0] px-2.5 py-1 rounded-full">
                  100% Aprobada
                </span>
              </div>

              <div className="space-y-3 text-[12px] text-[#5d564e]">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#2b7a4b] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Iluminación natural:</strong> Fotografías tomadas durante el día sin reflejos molestos ni luz artificial directa.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#2b7a4b] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Vehículo impecable:</strong> Carrocería limpia, vidrios transparentes y habitáculo libre de objetos personales.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#2b7a4b] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Formato apaisado 16:9:</strong> Facilita la visualización óptima en los catálogos web y móviles.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#2b7a4b] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>8 ángulos requeridos:</strong> Las 8 tomas garantizan transparencia absoluta al cliente previo al viaje.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f5f3f0] border border-[#ece8e2] text-[11px] text-[#7d766e]">
                <p>Las fotografías son analizadas automáticamente mediante control de resolución antes de indexarse.</p>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full py-3.5 rounded-xl bg-[#15110d] hover:bg-[#2a2621] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Confirmar Fotografías
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
