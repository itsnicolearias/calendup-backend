import {
  Table, Column, Model, DataType, HasMany,
  HasOne
} from "sequelize-typescript"
import { Appointment } from "./appointment"
import { Profile } from "./profile"
import { UserRole } from "../modules/auth/auth.interface"
import { AppointmentType } from "./appointment_type"
import { Review } from "./review"
import { Subscription } from "./subscription"

@Table({ 
  tableName: "users", 
  underscored: true, 
  defaultScope: {
      attributes: { exclude: ["password"] }, // 👈 excluye password siempre
    },
  scopes: {
      withPassword: {}, // 👈 scope para incluir password cuando lo necesites
    }})

export class User extends Model {

  
  @Column({ type: DataType.UUID, field: "user_id", primaryKey: true, allowNull: false,  defaultValue: DataType.UUIDV4, })
  //@Default(DataType.UUIDV4)
  userId!: string

  @Column({
    type: DataType.STRING
  })
  email!: string

  @Column({
    type: DataType.STRING,
    field: "password"
  })
  password: string

  @Column({
    type: DataType.STRING
  })
  role!: UserRole


  @Column({
    type: DataType.BOOLEAN
  })
  verified?: boolean

  @Column({
    type: DataType.STRING,
    field: "reset_token"
  })
  resetToken?: string

  @Column({
    type: DataType.DATE,
    field: "reset_token_expires"
  })
  resetTokenExpires?: Date

  @HasMany(() => Appointment)
  appointments!: Appointment[]

  @HasMany(() => AppointmentType)
  AppointmentTypes!: AppointmentType[]

  @HasMany(() => Review)
  Reviews: Review[]


  @HasOne(() => Profile)
  profile!: Profile

    @Column({
    type: DataType.STRING,
    field: "google_id"
  })
  googleId: string

    @Column({
    type: DataType.STRING,
    field: "facebook_id"
  })
  facebookId: string

  @HasOne(() => Subscription)
  Subscription!: Subscription

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
