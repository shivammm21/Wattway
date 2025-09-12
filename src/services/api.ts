// src/services/api.ts
export const mockStations = [
  { id: '1', name: 'GreenCharge - MG Road', lat: 12.9718, lng: 77.6412, distance: 1.2, price: 12, status: 'Available' },
  { id: '2', name: 'SparkPoint - City Mall', lat: 12.9712, lng: 77.6512, distance: 2.6, price: 18, status: 'Busy' },
];

export async function fetchStations() {
  await new Promise(r => setTimeout(r, 300));
  return mockStations;
}

export async function bookSlot(stationId: string, slotTime: string) {
  await new Promise(r => setTimeout(r, 500));
  return { bookingId: 'bk_' + Date.now(), status: 'PENDING' };
}
