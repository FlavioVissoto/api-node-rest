import { Knex } from './server/database/knex/index';
import { server } from './server/server';
import { LogService } from './server/shared/services';

const API_SERVER_PORT = process.env.PORT || '9000';

const startServer = () => {
  server.listen(API_SERVER_PORT, () => {
    LogService.logger.info(`The server is running on port ${API_SERVER_PORT}`);
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
        .catch((e: Error) => {
          LogService.writeError({ ...e, message: e.message + 'Erro ao rodar Seeds.' });
        });
    })
    .catch((e: Error) => {
      LogService.writeError({ ...e, message: e.message + 'Erro ao rodar Migrations.' });
    });
} else {
  startServer();
}
