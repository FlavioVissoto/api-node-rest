import { Knex } from 'knex';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.plataforma, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nm_platform', 150);
    })
    .then(() => {
      console.log(`### Create table ${TableName.plataforma}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.plataforma).then(() => {
    console.log(`### Drop table ${TableName.plataforma}`);
  });
}
