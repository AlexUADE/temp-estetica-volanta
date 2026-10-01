export type NavigationTab = 
  | 'explorar'
  | 'detalle-vehiculo'
  | 'carrito'
  | 'detalle-solicitud'
  | 'mis-reservas'
  | 'mis-publicaciones'
  | 'crear-publicacion'
  | 'gestion-disponibilidad'
  | 'mis-vehiculos'
  | 'registrar-vehiculo'
  | 'gestion-fotos'
  | 'mi-cuenta';

export type VehicleCategory = 'all' | 'sedan' | 'suv' | 'pickup' | 'hatchback' | 'deportivo';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: 'sedan' | 'suv' | 'pickup' | 'hatchback' | 'deportivo';
  categoryLabel: string;
  badge?: string;
  pricePerDay: number;
  discountNote?: string;
  seats: number;
  location: string;
  locationZone: string;
  color: string;
  transmission: string;
  plate: string;
  fuel: string;
  traction: string;
  trunkCapacity: string;
  autonomy: string;
  description: string;
  images: string[];
  host: {
    name: string;
    level: string;
    rating: number;
    deliveriesCount: number;
    initials: string;
  };
  deliveryAddress: string;
  pickupWindow: string;
  returnWindow: string;
  status: 'active' | 'paused' | 'disabled';
}

export interface Reservation {
  id: string;
  code: string;
  vehicleId: string;
  vehicle: Vehicle;
  periodText: string;
  startDate: string;
  endDate: string;
  days: number;
  pickupLocation: string;
  dailyRate: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  statusLabel: string;
  hostName: string;
  notes?: string;
  lockboxCode?: string;
  rating?: number;
  paymentMethod: 'mercadopago' | 'cash';
  paid: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string;
  isHost: boolean;
  avatarUrl?: string;
}

export interface CartState {
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  pickupTime: string;
  returnTime: string;
  days: number;
  dailyRate: number;
  discountAmount: number;
  total: number;
  paymentMethod: 'mercadopago' | 'cash';
}

export interface AvailabilityRangeItem {
  id: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled';
  daysCount: number;
  note?: string;
  freeLabel?: string;
}
