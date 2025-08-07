import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable("profiles", {
    profile_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      },
      onDelete: "CASCADE"
    },
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    bio: DataTypes.TEXT,
    job_title: DataTypes.TEXT,
    availability: DataTypes.JSONB,
    appointment_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30 // minutos
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable("profiles");
}
