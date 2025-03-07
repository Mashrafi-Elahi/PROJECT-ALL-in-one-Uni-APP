
import { firestoreService, FirestoreDocument } from './firestoreService';

export interface Faculty {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  office: string;
  officeHours?: string;
  imageUrl?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date | string;
  points: number;
  status: 'upcoming' | 'completed' | 'overdue';
}

export interface Class extends FirestoreDocument {
  name: string;
  code: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    location: string;
  };
  instructor: Faculty;
  credits: number;
  description: string;
  assignments: Assignment[];
  syllabus?: string;
}

class ClassesService {
  private readonly collectionName = 'classes';
  private readonly facultyCollection = 'faculty';

  async getAllClasses(): Promise<Class[]> {
    return firestoreService.getAll(this.collectionName) as Promise<Class[]>;
  }

  async getClassById(id: string): Promise<Class | null> {
    return firestoreService.getById(this.collectionName, id) as Promise<Class | null>;
  }

  async getClassesByDay(day: string): Promise<Class[]> {
    return firestoreService.query(
      this.collectionName,
      [{ field: 'schedule.days', operator: '==', value: day }]
    ) as Promise<Class[]>;
  }

  async getAllFaculty(): Promise<Faculty[]> {
    return firestoreService.getAll(this.facultyCollection) as Promise<Faculty[]>;
  }

  async getFacultyById(id: string): Promise<Faculty | null> {
    return firestoreService.getById(this.facultyCollection, id) as Promise<Faculty | null>;
  }

  async createClass(classData: Omit<Class, 'id'>): Promise<string> {
    return firestoreService.create(this.collectionName, classData);
  }

  async updateClass(id: string, classData: Partial<Class>): Promise<void> {
    return firestoreService.update(this.collectionName, id, classData);
  }

  async deleteClass(id: string): Promise<void> {
    return firestoreService.delete(this.collectionName, id);
  }

  async addAssignment(classId: string, assignment: Omit<Assignment, 'id'>): Promise<void> {
    const classDoc = await this.getClassById(classId);
    if (!classDoc) throw new Error('Class not found');
    
    const newAssignment = {
      id: Math.random().toString(36).substring(2, 15),
      ...assignment
    };
    
    const updatedAssignments = [...classDoc.assignments, newAssignment];
    await this.updateClass(classId, { assignments: updatedAssignments });
  }

  async updateAssignment(classId: string, assignmentId: string, data: Partial<Assignment>): Promise<void> {
    const classDoc = await this.getClassById(classId);
    if (!classDoc) throw new Error('Class not found');
    
    const updatedAssignments = classDoc.assignments.map(a => 
      a.id === assignmentId ? { ...a, ...data } : a
    );
    
    await this.updateClass(classId, { assignments: updatedAssignments });
  }
}

export const classesService = new ClassesService();
