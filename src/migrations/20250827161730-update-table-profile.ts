import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("profiles", "mark_app_as_completed", {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  })
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("profiles", "mark_app_as_completed")

}