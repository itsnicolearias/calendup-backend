import {
  Table, Column, Model, DataType, HasMany, PrimaryKey, Default, AllowNull
} from "sequelize-typescript"
import { Appointment } from "./appointment"
import { Profile } from "./profile"

@Table({ tableName: "users", underscored: true })
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
  password!: string

  @Column({
    type: DataType.STRING
  })
  role!: string


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
    field: "password_reset_expires"
  })
  passwordResetExpires?: Date

  @HasMany(() => Appointment)
  appointments!: Appointment[]

  @HasMany(() => Profile)
  profiles!: Profile[]

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
