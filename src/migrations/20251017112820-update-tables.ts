import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {

    await queryInterface.addColumn("integrations", "auto_create_meet_links", {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
    }); 

    await queryInterface.addColumn("integrations", "sync_app_with_calendar", {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
    }); 

    await queryInterface.addColumn("integrations", "show_events_in_agenda", {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
    }); 

    await queryInterface.addColumn("appointments", "meeting_link", {
    type: DataTypes.STRING,
    allowNull: true
    }); 

}

export async function down(queryInterface: QueryInterface): Promise<void> {

   await queryInterface.removeColumn("appointments", "meeting_link");
   await queryInterface.removeColumn("integrations", "show_events_in_agenda");
   await queryInterface.removeColumn("integrations", "sync_app_with_calendar",);
   await queryInterface.removeColumn("integrations", "auto_create_meet_links");

}