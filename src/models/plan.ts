import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { Subscription } from "./subscription";

@Table({
  tableName: "plans",
  timestamps: true,
})
export class Plan extends Model {

  @Column({ 
    type: DataType.UUID, 
    field: "plan_id", 
    primaryKey: true, 
    allowNull: false,  
    defaultValue: DataType.UUIDV4, 
})
  planId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "USD",
  })
  currency: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: {},
  })
  features: Record<string, any>;

  @HasMany(() => Subscription)
  subscriptions!: Subscription[];
}
