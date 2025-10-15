export interface PlanAttributes {
  planId?: number;
  name: string;
  price: number;
  annualPrice: number;
  currency: string;
  mpPlanId: string;
  mpAnnualPlanId: string;
  features: PlanFeatures;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PlanFeatures = {
    maxAppointmentsPerMonth?: number;
    services: boolean,
    customBranding: boolean,
    calendarAvailable: boolean,
    zoomAvailable: boolean,
    meetAvailable: boolean,
    prioritySupport: boolean,
    appointmentsPays: boolean,
    //[key: string]: any; // flexibilidad para más features en el futuro
}

export interface SubscriptionAttributes {
  subscriptionId?: number;
  userId: number;
  planId: number;
  status: "active" | "cancelled" | "paused";
  startDate: Date;
  endDate?: Date;
  type?: "monthly" | "annual";
  mpSubscriptionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}