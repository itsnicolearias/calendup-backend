export interface PlanAttributes {
  planId?: number;
  name: string;
  price: number;
  currency: string;
  features: {
    maxAppointmentsPerMonth?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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