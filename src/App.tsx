import { useState, useEffect } from 'react';
import { NavigationTab, Vehicle, Reservation, CartState, AvailabilityRangeItem } from './types/index.ts';
import {
  currentUser,
  mockVehicles,
  mockReservations,
  mockAvailabilityRanges,
  initialCart,
} from './data/mockData.ts';

import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { ExploreScreen } from './components/ExploreScreen.tsx';
import { VehicleDetailScreen } from './components/VehicleDetailScreen.tsx';
import { CartScreen } from './components/CartScreen.tsx';
import { ReservationDetailScreen } from './components/ReservationDetailScreen.tsx';
import { MyReservationsScreen } from './components/MyReservationsScreen.tsx';
import { MyListingsScreen } from './components/MyListingsScreen.tsx';
import { CreateListingScreen } from './components/CreateListingScreen.tsx';
import { AvailabilityManagementScreen } from './components/AvailabilityManagementScreen.tsx';
import { MyVehiclesScreen } from './components/MyVehiclesScreen.tsx';
import { RegisterVehicleScreen } from './components/RegisterVehicleScreen.tsx';
import { PhotoManagementScreen } from './components/PhotoManagementScreen.tsx';
import { MyAccountScreen } from './components/MyAccountScreen.tsx';
import { ConciergeChatModal } from './components/ConciergeChatModal.tsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('explorar');
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(mockVehicles[1]); // Audi A4 default
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation>(mockReservations[0]);
  const [cart, setCart] = useState<CartState | null>(initialCart);
  const [availabilityRanges, setAvailabilityRanges] = useState<AvailabilityRangeItem[]>(mockAvailabilityRanges);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat modal state
  const [chatModal, setChatModal] = useState<{
    isOpen: boolean;
    hostName: string;
    vehicleName: string;
  }>({
    isOpen: false,
    hostName: 'Nicolás M.',
    vehicleName: 'Audi A4 2.0 TFSI Quattro',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNavigate = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    handleNavigate('detalle-vehiculo');
  };

  const handleQuickBook = (vehicle: Vehicle) => {
    const days = 3;
    const dailyRate = vehicle.pricePerDay;
    const subtotal = dailyRate * days;
    const discountAmount = Math.round(subtotal * 0.05);
    const total = subtotal - discountAmount;

    setCart({
      vehicle,
      startDate: '14 Nov 2025',
      endDate: '17 Nov 2025',
      pickupTime: '10:00',
      returnTime: '19:00',
      days,
      dailyRate,
      discountAmount,
      total,
      paymentMethod: 'mercadopago',
    });

    handleNavigate('carrito');
    showToast(`Vehículo ${vehicle.name} agregado a su solicitud.`);
  };

  const handleStartBookingFromDetail = (bookingDetails: {
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
  }) => {
    setCart({
      vehicle: bookingDetails.vehicle,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      pickupTime: bookingDetails.pickupTime,
      returnTime: bookingDetails.returnTime,
      days: bookingDetails.days,
      dailyRate: bookingDetails.dailyRate,
      discountAmount: bookingDetails.discountAmount,
      total: bookingDetails.total,
      paymentMethod: 'mercadopago',
    });

    handleNavigate('carrito');
  };

  const handleConfirmReservation = (confirmedData: any) => {
    const newRes: Reservation = {
      id: `res_${Date.now()}`,
      code: `VOL-${Math.floor(1000 + Math.random() * 9000)}-${confirmedData.cart.vehicle.plate.slice(0, 2)}`,
      vehicleId: confirmedData.cart.vehicle.id,
      vehicle: confirmedData.cart.vehicle,
      periodText: `${confirmedData.cart.startDate} al ${confirmedData.cart.endDate}`,
      startDate: confirmedData.cart.startDate,
      endDate: confirmedData.cart.endDate,
      days: confirmedData.cart.days,
      pickupLocation: confirmedData.cart.vehicle.deliveryAddress,
      dailyRate: confirmedData.cart.dailyRate,
      totalAmount: confirmedData.cart.total,
      status: 'confirmed',
      statusLabel: 'Confirmada por el Anfitrión',
      hostName: confirmedData.cart.vehicle.host.name,
      lockboxCode: '8492#',
      paymentMethod: confirmedData.paymentMethod || 'mercadopago',
      paid: true,
    };

    setReservations([newRes, ...reservations]);
    setSelectedReservation(newRes);
    setCart(null);
    handleNavigate('detalle-solicitud');
    showToast('¡Solicitud de reserva confirmada con éxito!');
  };

  const handleOpenChat = (hostName: string, vehicleName: string) => {
    setChatModal({
      isOpen: true,
      hostName,
      vehicleName,
    });
  };

  const handleToggleVehicleStatus = (vehicleId: string) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === vehicleId
          ? { ...v, status: v.status === 'active' ? 'paused' : 'active' }
          : v
      )
    );
    showToast('Estado del vehículo actualizado.');
  };

  const handleVehicleCreated = (newVehicle: Vehicle) => {
    setVehicles([newVehicle, ...vehicles]);
    setSelectedVehicle(newVehicle);
    showToast('Vehículo registrado. Proceda a gestionar sus 8 fotografías.');
    handleNavigate('gestion-fotos');
  };

  const handlePublishListing = (publishedVehicle: Vehicle) => {
    setVehicles(
      vehicles.map((v) => (v.id === publishedVehicle.id ? publishedVehicle : v))
    );
    showToast('¡Publicación actualizada con éxito en el catálogo!');
    handleNavigate('mis-publicaciones');
  };

  const handleAddRange = (newRange: AvailabilityRangeItem) => {
    setAvailabilityRanges([...availabilityRanges, newRange]);
    showToast('Nuevo rango de disponibilidad agregado.');
  };

  const handleRemoveRange = (rangeId: string) => {
    setAvailabilityRanges(availabilityRanges.filter((r) => r.id !== rangeId));
    showToast('Rango de disponibilidad eliminado.');
  };

  // Scroll to top on first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex flex-col font-sans selection:bg-[#ede9e3] selection:text-[#15110d]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#15110d] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#cec5bc]/30 animate-fade-in text-[13px]">
          <span className="material-symbols-outlined text-[18px] text-[#d49727]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={cart ? 1 : 0}
        user={currentUser}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'explorar' && (
          <ExploreScreen
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onQuickBook={handleQuickBook}
          />
        )}

        {currentTab === 'detalle-vehiculo' && (
          <VehicleDetailScreen
            vehicle={selectedVehicle}
            onNavigate={handleNavigate}
            onBook={handleStartBookingFromDetail}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentTab === 'carrito' && (
          <CartScreen
            cart={cart}
            currentUser={currentUser}
            onNavigate={handleNavigate}
            onConfirmReservation={handleConfirmReservation}
          />
        )}

        {currentTab === 'detalle-solicitud' && (
          <ReservationDetailScreen
            reservation={selectedReservation}
            onNavigate={handleNavigate}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentTab === 'mis-reservas' && (
          <MyReservationsScreen
            reservations={reservations}
            onSelectReservation={(res) => {
              setSelectedReservation(res);
              handleNavigate('detalle-solicitud');
            }}
            onNavigate={handleNavigate}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentTab === 'mis-publicaciones' && (
          <MyListingsScreen
            vehicles={vehicles}
            onNavigate={handleNavigate}
            onSelectVehicleForAvailability={(v) => {
              setSelectedVehicle(v);
              handleNavigate('gestion-disponibilidad');
            }}
            onSelectVehicleForPhotos={(v) => {
              setSelectedVehicle(v);
              handleNavigate('gestion-fotos');
            }}
            onToggleStatus={handleToggleVehicleStatus}
          />
        )}

        {currentTab === 'crear-publicacion' && (
          <CreateListingScreen
            vehicles={vehicles}
            onNavigate={handleNavigate}
            onPublishListing={handlePublishListing}
          />
        )}

        {currentTab === 'gestion-disponibilidad' && (
          <AvailabilityManagementScreen
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            availabilityRanges={availabilityRanges}
            onNavigate={handleNavigate}
            onSelectVehicle={(v) => setSelectedVehicle(v)}
            onAddRange={handleAddRange}
            onRemoveRange={handleRemoveRange}
          />
        )}

        {currentTab === 'mis-vehiculos' && (
          <MyVehiclesScreen
            vehicles={vehicles}
            onNavigate={handleNavigate}
            onSelectVehicleForPhotos={(v) => {
              setSelectedVehicle(v);
              handleNavigate('gestion-fotos');
            }}
            onSelectVehicleForListing={(v) => {
              setSelectedVehicle(v);
              handleNavigate('crear-publicacion');
            }}
          />
        )}

        {currentTab === 'registrar-vehiculo' && (
          <RegisterVehicleScreen
            onNavigate={handleNavigate}
            onVehicleCreated={handleVehicleCreated}
          />
        )}

        {currentTab === 'gestion-fotos' && (
          <PhotoManagementScreen
            vehicle={selectedVehicle}
            onNavigate={handleNavigate}
            onSavePhotos={(_photos) => {
              showToast('Fotografías sincronizadas con el catálogo.');
            }}
          />
        )}

        {currentTab === 'mi-cuenta' && (
          <MyAccountScreen user={currentUser} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Concierge Chat Modal */}
      <ConciergeChatModal
        isOpen={chatModal.isOpen}
        onClose={() => setChatModal({ ...chatModal, isOpen: false })}
        hostName={chatModal.hostName}
        vehicleName={chatModal.vehicleName}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
