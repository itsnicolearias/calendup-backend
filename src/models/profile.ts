import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, Default
} from "sequelize-typescript"
import { User } from "./user"
import { Json } from "sequelize/types/utils"

@Table({ tableName: "profiles", underscored: true })
export class Profile extends Model {
  
  @Column({ type: DataType.UUID, field: "profile_id", primaryKey: true, allowNull: false,  defaultValue: DataType.UUIDV4, })
  //@Default(DataType.UUIDV4)
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
  lastName?: string

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
  availability?: Json
  

  @Column({ type: DataType.INTEGER, field: "appointment_duration" })
  appointmentDuration?: number // en minutos

  @BelongsTo(() => User)
  user!: User

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
