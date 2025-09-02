import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("profiles", "country", {
  type: DataTypes.STRING,
  allowNull: true,
});

  await queryInterface.addColumn("profiles", "province", {
  type: DataTypes.STRING,
  allowNull: true,
});
 
  await queryInterface.addColumn("profiles", "city", {
  type: DataTypes.STRING,
  allowNull: true,
});

  await queryInterface.addColumn("profiles", "profile_completed", {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
});

  await queryInterface.addColumn("profiles", "education", {
  type: DataTypes.JSONB,
  allowNull: true,
});

  await queryInterface.addColumn("profiles", "languages", {
  type: DataTypes.JSONB,
  allowNull: true,
});
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("profiles", "country");
  await queryInterface.removeColumn("profiles", "province");
  await queryInterface.removeColumn("profiles", "city");
  await queryInterface.removeColumn("profiles", "profile_completed");
  await queryInterface.removeColumn("profiles", "education");
  await queryInterface.removeColumn("profiles", "languages");

}