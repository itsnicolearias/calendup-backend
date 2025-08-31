// types/review.ts
export interface Review {
  reviewId: string;
  professionalId: string;
  appointmentId: string;
  rating: number; // 1 a 5
  comment?: string | null;
  deleted: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface ReviewCreate {
  professionalId: string;
  appointmentId: string;
  rating: number;
  comment?: string | null;
}
