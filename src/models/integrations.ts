import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript"
import { User } from "./user"
import { IntegrationsProviders } from "../modules/settings/integrations/integrations.interface"

@Table({ tableName: "integrations", underscored: true })
export class Integration extends Model {
  @Column({
    type: DataType.UUID,
    field: "integration_id",
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  integrationId: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: "user_id",
    allowNull: false,
  })
  userId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  provider: IntegrationsProviders

  @Column({
    type: DataType.STRING,
    field: "access_token",
    allowNull: true,
  })
  accessToken?: string

  @Column({
    type: DataType.STRING,
    field: "refresh_token",
    allowNull: true,
  })
  refreshToken?: string

  @Column({
    type: DataType.DATE,
    field: "token_expires_at",
    allowNull: true,
  })
  tokenExpiresAt?: Date

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  active: boolean

  @BelongsTo(() => User)
  User!: User

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "created_at",
    defaultValue: DataType.NOW,
  })
  createdAt: Date

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "updated_at",
    defaultValue: DataType.NOW,
  })
  updatedAt: Date
}
