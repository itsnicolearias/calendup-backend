import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("users", "google_id", {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    })

  await queryInterface.addColumn("users", "facebook_id", {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      })

  await queryInterface.changeColumn("users", 'password', {
    type: DataTypes.STRING,
    allowNull: true
  });

  

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.changeColumn("users", 'password', {
    type: DataTypes.STRING,
    allowNull: false
  });
  await queryInterface.removeColumn("users", 'facebook_id');
  await queryInterface.removeColumn("users", 'google_id');


}