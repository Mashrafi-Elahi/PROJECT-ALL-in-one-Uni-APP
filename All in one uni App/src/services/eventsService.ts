
import { firestoreService, FirestoreDocument } from './firestoreService';

export interface Event extends FirestoreDocument {
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  organizer: string;
  category: 'academic' | 'sports' | 'cultural' | 'workshop' | 'other';
  imageUrl?: string;
  registrationRequired: boolean;
  registrationLink?: string;
  isFeatured: boolean;
  attendees?: string[]; // User IDs
}

class EventsService {
  private readonly collectionName = 'events';

  async getAllEvents(): Promise<Event[]> {
    return firestoreService.getAll(this.collectionName) as Promise<Event[]>;
  }

  async getEventById(id: string): Promise<Event | null> {
    return firestoreService.getById(this.collectionName, id) as Promise<Event | null>;
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return firestoreService.query(
      this.collectionName,
      [{ field: 'isFeatured', operator: '==', value: true }]
    ) as Promise<Event[]>;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return firestoreService.query(
      this.collectionName,
      [{ field: 'startDate', operator: '>=', value: now }],
      'startDate'
    ) as Promise<Event[]>;
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    return firestoreService.query(
      this.collectionName,
      [{ field: 'category', operator: '==', value: category }]
    ) as Promise<Event[]>;
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<string> {
    return firestoreService.create(this.collectionName, event);
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<void> {
    return firestoreService.update(this.collectionName, id, event);
  }

  async deleteEvent(id: string): Promise<void> {
    return firestoreService.delete(this.collectionName, id);
  }

  async registerForEvent(eventId: string, userId: string): Promise<void> {
    const event = await this.getEventById(eventId);
    if (!event) throw new Error('Event not found');
    
    const attendees = event.attendees || [];
    if (!attendees.includes(userId)) {
      attendees.push(userId);
      await this.updateEvent(eventId, { attendees });
    }
  }

  async unregisterFromEvent(eventId: string, userId: string): Promise<void> {
    const event = await this.getEventById(eventId);
    if (!event) throw new Error('Event not found');
    
    const attendees = event.attendees || [];
    const updatedAttendees = attendees.filter(id => id !== userId);
    await this.updateEvent(eventId, { attendees: updatedAttendees });
  }
}

export const eventsService = new EventsService();
