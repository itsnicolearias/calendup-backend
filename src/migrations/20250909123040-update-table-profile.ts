import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("profiles", "profile_progress", {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
});

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("profiles", "profile_progress");


}