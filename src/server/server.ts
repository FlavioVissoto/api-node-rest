import express from 'express';

const server = express();

server.get('/', (req, res, next) => {
  return res.send('Vissoto');
});

export { server };
