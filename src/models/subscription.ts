import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { Plan } from "./plan";

@Table({
  tableName: "subscriptions",
  timestamps: true,
})
export class Subscription extends Model {
  
  @Column({ 
    type: DataType.UUID, 
    field: "subscription_id", 
    primaryKey: true, 
    allowNull: false,  
    defaultValue: DataType.UUIDV4, 
  })
  subscriptionId!: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "user_id",
  })
  userId!: number;

  @ForeignKey(() => Plan)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "plan_id",
  })
  planId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "active",
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "start_date",
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "end_date",
  })
  endDate?: Date;

  @BelongsTo(() => Plan)
  plan!: Plan;
}
