import {
  Table, Column, Model, DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript"
import { User } from "./user"
import { Appointment } from "./appointment"


@Table({ tableName: "reviews", underscored: true })
export class Review extends Model {
  
  @Column({type: DataType.UUID, field: "review_id", allowNull: false, primaryKey: true,  defaultValue: DataType.UUIDV4})
  //@Default(DataType.UUIDV4)
  reviewId: string

  @Column({type: DataType.INTEGER, allowNull: false, validate: { min: 1, max: 5 } })
  rating: number

  @Column({type: DataType.TEXT, allowNull: true})
  comment?: string

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: "professional_id" })
  professionalId!: string

  @ForeignKey(() => Appointment)
  @Column({ type: DataType.UUID, field: "appointment_id" })
  appointmentId!: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  deleted: boolean;

  @BelongsTo(() => User)
  Professional!: User

  @BelongsTo(() => Appointment)
  Appointment!: Appointment

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'created_at',
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'updated_at',
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
