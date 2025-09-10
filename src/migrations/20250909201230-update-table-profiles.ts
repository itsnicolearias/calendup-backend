import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("profiles", "is_new_user", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
});

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("profiles", "is_new_user");


}