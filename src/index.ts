import { server } from './server/server';

const API_SERVER_PORT = process.env.PORT || '9000';

server.listen(API_SERVER_PORT, () => {
  console.log(`The server is running on port ${API_SERVER_PORT}`);
});
