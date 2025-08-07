import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable("appointments", {
    appoinment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    professional_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      },
      onDelete: "CASCADE"
    },
    name: DataTypes.STRING(50),
    last_name: DataTypes.STRING,
    email: DataTypes.STRING(50),
    phone: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.STRING,
    reason: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending"
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable("appointments");
}
