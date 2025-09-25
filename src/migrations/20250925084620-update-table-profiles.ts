import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn("profiles", "pc_modal_showed", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
});

  await queryInterface.bulkUpdate(
    "plans", 
    { features: JSON.stringify({
            maxAppointmentsPerMonth: 50
            })
        }, 
    { plan_id: "5cca8214-0630-4210-9aa1-3fc27439ac2b" }
    )

}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn("profiles", "pc_modal_showed");

  await queryInterface.bulkUpdate(
    "plans", 
    { features: JSON.stringify({
            maxAppointmentsPerMonth: 30
            })
        }, 
    { plan_id: "5cca8214-0630-4210-9aa1-3fc27439ac2b" }
    )


}