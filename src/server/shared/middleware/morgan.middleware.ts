import morgan, { StreamOptions } from 'morgan';

import { LogService } from '../services';

// Substitua o método stream dizendo a Morgan para usar nosso registrador personalizado em vez do LogService.logger.info
const stream: StreamOptions = {
  write: (message: string) => LogService.logger.http(message),
};

// Ignora todo o log http do Morgan se o aplicativo não estiver sendo executado no modo de desenvolvimento.
// Este método não é realmente necessário aqui, pois já informamos ao logger que ele deve imprimir apenas mensagens de 'warning' e 'error' em produção.
const skip = () => {
  const env = process.env.NODE_ENV || 'dev';
  return env !== 'dev';
};

export const morganMiddleware = morgan(
  'Method: :method | Path: :url | Status: :status | Length: :res[content-length] | Time: :response-time ms',
  { stream, skip }
);
