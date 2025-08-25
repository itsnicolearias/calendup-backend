import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable("appointment_types", {
    appointment_type_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    session_type: DataTypes.STRING,
    professional_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      },
      onDelete: "CASCADE"
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
   
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });

  await queryInterface.removeColumn("appointments", "appointment_type")

  await queryInterface.addColumn("appointments", "appointment_type_id", {
     type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "appointment_types",
        key: "appointment_type_id"
      },
      onDelete: "CASCADE"
  })
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeColumn("appointments", "appointment_type_id")

    await queryInterface.addColumn("appointments", "appointment_type", {
    type: DataTypes.STRING
  })
    await queryInterface.dropTable("appointment_types");
}
