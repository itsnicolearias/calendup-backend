import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("appointment_types", "session_type");

  await queryInterface.addColumn("profiles", "app_mode", {
    type: DataTypes.STRING,
    allowNull: true
    }); 

    await queryInterface.addColumn("appointments", "selected_app_mode", {
    type: DataTypes.STRING,
    allowNull: true
    }); 

}

export async function down(queryInterface: QueryInterface): Promise<void> {

   await queryInterface.addColumn("appointment_types", "session_type", {
    type: DataTypes.STRING,
    allowNull: true
}); 

   await queryInterface.removeColumn("profiles", "app_mode");
   
   await queryInterface.removeColumn("appointments", "selected_app_mode");

}