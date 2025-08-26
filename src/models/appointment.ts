import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo,
  HasOne
} from "sequelize-typescript"
import { User } from "./user"
import { AppointmentStatus } from "../modules/appointments/interfaces/appointment.interface"
import { AppointmentType } from "./appointment_type"
import { Review } from "./review"

@Table({ tableName: "appointments", underscored: true })
export class Appointment extends Model {
  
  @Column({type: DataType.UUID, field: "appoinment_id", allowNull: false, primaryKey: true,  defaultValue: DataType.UUIDV4})
  //@Default(DataType.UUIDV4)
  appointmentId: string

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: "professional_id" })
  professionalId!: string

  @Column({type: DataType.STRING, field: "name"})
  name?: string

  @Column({type: DataType.STRING, field: "last_name"})
  lastName?: string

  @Column(DataType.STRING)
  phone?: string

  @Column(DataType.STRING)
  email: string

  @Column(DataType.DATE)
  date: Date

  @Column(DataType.STRING)
  time: string

  @Column(DataType.STRING)
  status: AppointmentStatus

  @Column(DataType.STRING)
  reason?: string

  @ForeignKey(() => AppointmentType)
  @Column({ type: DataType.UUID, field: "appointment_type_id" })
  appointmentTypeId?: string

  @BelongsTo(() => User)
  professional!: User

  @BelongsTo(() => AppointmentType)
  AppointmentType?: User

  @HasOne(() => Review)
  Review: Review[]

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  deleted: boolean;

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
