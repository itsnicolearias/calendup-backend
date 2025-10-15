import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("subscriptions", "mp_subscription_id", {
    type: DataTypes.STRING,
    allowNull: true
});

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("subscriptions", "mp_subscription_id");

}