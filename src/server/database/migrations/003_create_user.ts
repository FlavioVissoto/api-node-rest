import chalk from 'chalk';
import { Knex } from 'knex';
import { TableName } from '../tablename';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TableName.user, (table: Knex.CreateTableBuilder) => {
      table.bigIncrements('id').primary().index();
      table.integer('cd_status').index().notNullable();
      table.string('nm_user').notNullable().checkLength('>', 3);
      table.string('nm_email').index().unique().notNullable().checkLength('>', 5);
      table.string('nm_pass').notNullable().checkLength('>=', 6);
    })
    .then(() => {
      console.log(chalk.green(`### Create table ${TableName.user}`));
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TableName.user).then(() => {
    console.log(chalk.yellow(`### Drop table ${TableName.user}`));
  });
}
