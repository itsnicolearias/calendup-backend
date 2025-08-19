import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("users", 'deleted', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });

  await queryInterface.addColumn("profiles", 'deleted', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });

  await queryInterface.addColumn("appointments", 'deleted', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });

  await queryInterface.addColumn("appointment_types", 'deleted', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("appointment_types", 'deleted');
  await queryInterface.removeColumn("appointments", 'deleted');
  await queryInterface.removeColumn("profiles", 'deleted');
  await queryInterface.removeColumn("users", 'deleted');

}