import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.addColumn("plans", "mp_plan_id", {
        type: DataTypes.STRING,
        allowNull: true,
    })

    await queryInterface.addColumn("plans", "mp_annual_plan_id", {
        type: DataTypes.STRING,
        allowNull: true,
    })

    await queryInterface.addColumn("plans", "annual_price", {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    })


    await queryInterface.bulkInsert("plans", [
          {
            plan_id: "5cca8215-0630-4211-9aa1-3fc27439ac3b",
            name: "Plan Premium",
            price: 10000.00,
            annual_price: 100000.00,
            currency: "ARS",
            features:  JSON.stringify({
              services: true,
              customBranding: true,
              calendarAvailable: true,
              zoomAvailable: true,
              meetAvailable: true,
              prioritySupport: true,
              appointmentsPays: true,
            }),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);

 await queryInterface.bulkUpdate(
    "plans", 
    { 
        name: "Plan Gratuito",
        features:  JSON.stringify({
              services: false,
              maxAppointmentsPerMonth: 50,
              customBranding: false,
              calendarAvailable: false,
              zoomAvailable: false,
              meetAvailable: false,
              prioritySupport: false,
              appointmentsPays: false,
        }),
        
    }, 
    { plan_id: "5cca8214-0630-4210-9aa1-3fc27439ac2b" }
    )
}

export async function down(queryInterface: QueryInterface): Promise<void> {
    
    await queryInterface.bulkUpdate(
    "plans", 
    { features: JSON.stringify({
            maxAppointmentsPerMonth: 50
            })
        }, 
    { plan_id: "5cca8214-0630-4210-9aa1-3fc27439ac2b" }
    )

    await queryInterface.bulkDelete(
    "plans",
    { plan_id: "5cca8215-0630-4211-9aa1-3fc27439ac3b" }
    )
    await queryInterface.removeColumn("plans", "mp_annual_plan_id")

    await queryInterface.removeColumn("plans", "mp_plan_id")

    await queryInterface.removeColumn("plans", "annual_price")

}
