import { Knex } from 'knex';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.platforma, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('nm_platform', 150).checkLength('<=', 150).notNullable();
    })
    .then(() => {
      console.log(`### Create table ${TableName.platforma}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.platforma).then(() => {
    console.log(`### Drop table ${TableName.platforma}`);
  });
}
