import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("appointments", "appointment_type", {
    type: DataTypes.STRING
  })

  await queryInterface.addColumn("profiles", "default_app_confirmation", {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  })

  await queryInterface.addColumn("profiles", "profile_picture", {
    type: DataTypes.TEXT
  })

  await queryInterface.addColumn("profiles", "license_number", {
    type: DataTypes.STRING
  })

  await queryInterface.addColumn("profiles", "insurance_providers", {
    type: DataTypes.JSONB
  })
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("appointments", "appointment_type")
  await queryInterface.removeColumn("profiles", "default_app_confirmation")
  await queryInterface.removeColumn("profiles", "profile_picture")
  await queryInterface.removeColumn("profiles", "license_number")
  await queryInterface.removeColumn("profiles", "insurance_providers")
}