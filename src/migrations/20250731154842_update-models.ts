import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.renameColumn("users", 'createdAt', 'created_at');
  await queryInterface.renameColumn("users", 'updatedAt', 'updated_at');

  await queryInterface.renameColumn("profiles", 'userId', 'user_id');
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.renameColumn("users", 'created_at', 'createdAt');
  await queryInterface.renameColumn("users", 'updated_at', 'updatedAt');
  await queryInterface.renameColumn("profiles", 'user_id', 'userId');
}