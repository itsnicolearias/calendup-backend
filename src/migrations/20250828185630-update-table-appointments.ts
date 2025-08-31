import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("appointments", "appointment_code", {
  type: DataTypes.STRING,
  allowNull: true,
});
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("appointments", "appointment_code");

}