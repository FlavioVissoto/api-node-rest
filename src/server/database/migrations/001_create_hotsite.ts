import { Knex } from 'knex';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.hotsite, (table) => {
      table.bigIncrements('id').primary().index();
      table.integer('nr_usuario');
      table.integer('nr_bounce_rate');
      table.integer('nr_download');
      table.integer('nr_instalacao');
      table.integer('nr_lista_espera');
      table.date('dt_info');
    })
    .then(() => {
      console.log(`### Create table ${TableName.hotsite}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.hotsite).then(() => {
    console.log(`### Drop table ${TableName.hotsite}`);
  });
}
