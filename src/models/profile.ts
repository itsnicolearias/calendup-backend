import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo
} from "sequelize-typescript"
import { User } from "./user"
import { Availability } from "../modules/settings/profile.interface"
import { Json } from "sequelize/types/utils"

@Table({ tableName: "profiles", underscored: true })
export class Profile extends Model {
  @Column({ type: DataType.UUID, field: "profile_id", primaryKey: true, allowNull: false,  defaultValue: DataType.UUIDV4, })
  profileId!: string

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: "user_id" })
 
  userId!: string

  @Column({
    type: DataType.STRING
  })
  name?: string

  @Column({
    type: DataType.STRING, 
    field: "last_name"
  })
  lastName: string

  @Column({
    type: DataType.STRING
  })
  address?: string

  @Column({
    type: DataType.STRING
  })
  phone?: string

  @Column({
    type: DataType.STRING
  })
  bio?: string

  @Column({
    type: DataType.STRING,
    field: "job_title"
  })
  jobTitle?: string


  @Column({
    type: DataType.JSONB
  })
  availability?: Availability
  

  @Column({ type: DataType.INTEGER, field: "appointment_duration" })
  appointmentDuration?: number // en minutos

  @Column({
    type: DataType.JSONB,
    field: "insurance_providers"
  })
  insuranceProviders?: Json

  @Column({
    type: DataType.TEXT,
    field: "profile_picture"
  })
  profilePicture?: string

  @Column({
    type: DataType.BOOLEAN,
    field: "default_app_confirmation",
    defaultValue: true
  })
  defaultAppConfirmation?: Boolean

  @Column({
    type: DataType.BOOLEAN,
    field: "mark_app_as_completed",
    defaultValue: true
  })
  markAppAsCompleted?: Boolean

  @Column({
    type: DataType.STRING,
    field: "license_number"
  })
  licenseNumber?: String

  @Column({
    type: DataType.STRING,
  })
  country?: String

  @Column({
    type: DataType.STRING,
  })
  province?: String

  @Column({
    type: DataType.STRING,
  })
  city?: String

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: "profile_completed"
  })
  profileCompleted: boolean;

  @Column({
    type: DataType.JSONB,
  })
  education?: Json

  @Column({
    type: DataType.JSONB,
  })
  languages?: Json

  @Column({
    type: DataType.SMALLINT,
    defaultValue: 0,
    allowNull: false,
    field: "profile_progress"
  })
  profileProgress: number;

  @BelongsTo(() => User)
  user!: User

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
