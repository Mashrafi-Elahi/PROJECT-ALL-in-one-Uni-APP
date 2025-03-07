
import { firestoreService, FirestoreDocument } from './firestoreService';

export interface BusStop {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  estimatedArrival?: string;
}

export interface BusRoute extends FirestoreDocument {
  name: string;
  description: string;
  color: string;
  stops: BusStop[];
  schedule: {
    weekday: string[];
    weekend: string[];
  };
  isActive: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

class BusRoutesService {
  private readonly collectionName = 'busRoutes';

  async getAllRoutes(): Promise<BusRoute[]> {
    return firestoreService.getAll(this.collectionName) as Promise<BusRoute[]>;
  }

  async getRouteById(id: string): Promise<BusRoute | null> {
    return firestoreService.getById(this.collectionName, id) as Promise<BusRoute | null>;
  }

  async getActiveRoutes(): Promise<BusRoute[]> {
    return firestoreService.query(
      this.collectionName,
      [{ field: 'isActive', operator: '==', value: true }]
    ) as Promise<BusRoute[]>;
  }

  async createRoute(route: Omit<BusRoute, 'id'>): Promise<string> {
    return firestoreService.create(this.collectionName, route);
  }

  async updateRoute(id: string, route: Partial<BusRoute>): Promise<void> {
    return firestoreService.update(this.collectionName, id, route);
  }

  async updateBusLocation(id: string, lat: number, lng: number): Promise<void> {
    return firestoreService.update(this.collectionName, id, {
      currentLocation: { lat, lng }
    });
  }

  async deleteRoute(id: string): Promise<void> {
    return firestoreService.delete(this.collectionName, id);
  }
}

export const busRoutesService = new BusRoutesService();
