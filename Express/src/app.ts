import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors'; // don't need to wrap async/await inside try/catch block
import compression from 'compression';
import { connect, set } from 'mongoose';
import express, { Router } from 'express';
import mongoSanitize from 'express-mongo-sanitize';

import config from '@shared/config';
import logger from '@shared/utils/logger';
import errorMiddleware from '@shared/middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Router[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    // this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(config.mongoose.url, config.mongoose.options).then(() => {
      logger.info('🏃 Connected to MongoDB');
      logger.info(`=================================`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.logFormat));
    // this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(cors());
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(mongoSanitize());
  }

  private initializeRoutes(routes: Router[]) {
    this.app.use('/', (_, res) => {
      res.send('All is well!');
    });

    routes.forEach(route => {
      this.app.use('/api', route);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
