import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';

import typeDefs from '@graphql/schema';
import resolvers from '@graphql/resolvers';
import logger from '@shared/utils/logger';

export default class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public httpServer;
  public server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.httpServer = http.createServer(this.app);
    this.env = process.env.NODE_ENV || 'development';

    this.init();
  }

  private init() {
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ], // helps to shut down server gracefully
      context: async ({ req }) => {
        // const auth = (req.headers && req.headers.authorization) || '';
        const users = '';
        const user = (users && users[0]) || null;
        return { user: 'bipin' };
      },
      introspection: true,
      // formatError: err => {
      //   // Don't give the specific errors to the client.
      //   if (err.message.startsWith('Database Error: ')) {
      //     return new Error('Internal server error');
      //   }
      //   // Otherwise return the original error. The error can also
      //   // be manipulated in other ways, as long as it's returned.
      //   return err;
      // },

      // formatResponse: () => {

      // },
      // debug: true/false
    });
  }

  public async listen() {
    await this.server.start();
    // await this.server.start({
    //   cors: { credentials: true, origin: ['http://localhost:4000'] },
    // });

    // Additional middleware can be mounted at this point to run before Apollo.
    // this.app.use(cors());
    this.app.use(morgan(process.env.LOG_FORMAT));
    this.app.use(mongoSanitize());

    this.server.applyMiddleware({
      app: this.app,
      cors: false,
    });

    // await new Promise(resolve => this.app.listen({ port: this.port }, resolve));
    this.httpServer.listen({ port: this.port });

    logger.info(`======= ENV: ${this.env} =======`);
    logger.info(`🚀 Graphql server ready at http://localhost:${this.port}${this.server.graphqlPath}`);
  }
}

// }

// TRY THIS i.e if two query is possible and returns the data
// query GetBooksAndAuthors {
//   books {
//     title
//   }

//   authors {
//     name
//   }
// }
