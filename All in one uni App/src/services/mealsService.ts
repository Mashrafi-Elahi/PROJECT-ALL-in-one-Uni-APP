
import { firestoreService, FirestoreDocument } from './firestoreService';

export interface Meal extends FirestoreDocument {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  availability: string[]; // days of the week
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
}

class MealsService {
  private readonly collectionName = 'meals';

  async getAllMeals(): Promise<Meal[]> {
    return firestoreService.getAll(this.collectionName) as Promise<Meal[]>;
  }

  async getMealById(id: string): Promise<Meal | null> {
    return firestoreService.getById(this.collectionName, id) as Promise<Meal | null>;
  }

  async getMealsByCategory(category: string): Promise<Meal[]> {
    return firestoreService.query(
      this.collectionName,
      [{ field: 'category', operator: '==', value: category }]
    ) as Promise<Meal[]>;
  }

  async getMealsByAvailability(day: string): Promise<Meal[]> {
    return firestoreService.query(
      this.collectionName,
      [{ field: 'availability', operator: '==', value: day }]
    ) as Promise<Meal[]>;
  }

  async createMeal(meal: Omit<Meal, 'id'>): Promise<string> {
    return firestoreService.create(this.collectionName, meal);
  }

  async updateMeal(id: string, meal: Partial<Meal>): Promise<void> {
    return firestoreService.update(this.collectionName, id, meal);
  }

  async deleteMeal(id: string): Promise<void> {
    return firestoreService.delete(this.collectionName, id);
  }
}

export const mealsService = new MealsService();
