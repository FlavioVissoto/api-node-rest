import { addColors, createLogger, format, transports } from 'winston';

type LevelLog = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

// Mostra todos os níveis de log se o servidor foi executado em dev;
// caso contrário, se foi executado em produção, mostra apenas mensagens de 'warning' e 'error'.
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define cores diferentes para cada nível
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

const formatConfig = format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), format.json());

const transportsConfig = [
  new transports.Console({
    format: format.combine(
      format.colorize({ all: true }),
      format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
  }),
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new transports.File({
    filename: 'logs/http.log',
    level: 'http',
  }),
  new transports.File({
    filename: 'logs/info.log',
    level: 'info',
  }),
  new transports.File({
    filename: 'logs/all.log',
    format: format.combine(format.json()),
  }),
];

addColors(colors);

const logger = createLogger({
  level: level(),
  levels: levels,
  format: formatConfig,
  transports: transportsConfig,
});

const writeError = (err: LogError) => {
  console.log(err);
  const logMessage = `File: ${err.file} ### Method: ${err.method} ### Name: ${err.name} ### Message: ${err.message} ### Stack: ${err.stack}`;
  logger.error(logMessage);
};

const write = (level: LevelLog, errName: string, errMessage: string, errStack: string = '') => {
  const logMessage = `Name: ${errName}\nMessage: ${errMessage}\nStack: ${errStack}`;
  logger[level](logMessage);
};

export interface LogError {
  file: string;
  method: string;
  name: string;
  message: string;
  stack?: string;
  //[key: string]: string;
}

export const LogService = {
  logger,
  write,
  writeError,
};
