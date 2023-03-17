import chalk from 'chalk';
import { Knex } from './server/database/knex/index';
import { server } from './server/server';

const API_SERVER_PORT = process.env.PORT || '9000';

const startServer = () => {
  server.listen(API_SERVER_PORT, () => {
    console.log(`The server is running on port ${API_SERVER_PORT}`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => {
          startServer();
        })
        .catch((e) => {
          console.log('Erro ao rodar Seeds.');
          console.log(chalk.red(e));
        });
    })
    .catch((e) => {
      console.log('Erro ao rodar Migrations.');
      console.log(chalk.red(e));
    });
} else {
  startServer();
}
