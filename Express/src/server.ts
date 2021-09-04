import App from '@/app';
import logger from '@shared/utils/logger';
import Routes from '@shared/routes';

const app = new App(Routes);
app.listen();

process.on('uncaughtException', error => {
  logger.info('UN_CAUGHT_EXCEPTION');
  logger.error(error);

  process.exit(1); // exit application
});

process.on('unhandledRejection', (error, promise) => {
  logger.info('UN_HANDLED_PROMISE_REJECTION', promise);
  logger.error(error);
});
