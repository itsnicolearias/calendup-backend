export interface PlanAttributes {
  planId?: number;
  name: string;
  price: number;
  currency: string;
  features: {
    maxAppointmentsPerMonth?: number;
    [key: string]: any; // flexibilidad para más features en el futuro
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubscriptionAttributes {
  subscriptionId?: number;
  userId: number;
  planId: number;
  status: "active" | "canceled" | "paused";
  startDate: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const FREE_PLAN_ID = "5cca8214-0630-4210-9aa1-3fc27439ac2b";