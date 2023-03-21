import { Knex } from 'knex';
import { LogService } from '../../shared/services';
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
      LogService.logger.info(`### Create table ${TableName.hotsite}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.hotsite).then(() => {
    LogService.logger.info(`### Drop table ${TableName.hotsite}`);
  });
}
