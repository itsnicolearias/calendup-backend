import { QueryInterface } from "sequelize";
import { User } from "../models/user";
import { Profile } from "../models/profile";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.renameColumn("users", 'createdAt', 'created_at');
  await queryInterface.renameColumn("users", 'updatedAt', 'updated_at');

  await queryInterface.renameColumn("profiles", 'userId', 'user_id');
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.renameColumn(User.tableName, 'created_at', 'createdAt');
  await queryInterface.renameColumn(User.tableName, 'updated_at', 'updatedAt');
  await queryInterface.renameColumn(Profile.tableName, 'user_id', 'userId');
}