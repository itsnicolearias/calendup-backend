import {
  Table, Column, Model, DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript"
import { User } from "./user"

@Table({ tableName: "appointment_types", underscored: true })
export class AppointmentType extends Model {
  
  @Column({type: DataType.UUID, field: "appointment_type_id", allowNull: false, primaryKey: true,  defaultValue: DataType.UUIDV4})
  //@Default(DataType.UUIDV4)
  appointmentTypeId: string

  @Column({type: DataType.STRING, field: "name"})
  name?: string

  @Column({type: DataType.DECIMAL(10, 2), defaultValue: 0.0})
  price?: string

  @Column(DataType.STRING)
  description?: string

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: "professional_id" })
  professionalId!: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  deleted: boolean;

  @BelongsTo(() => User)
  professional!: User

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
