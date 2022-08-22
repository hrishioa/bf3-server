import express from 'express';
import BF3DataSource from './db/bf3-data-source';
import cors from 'cors';
import morgan from 'morgan';
import highlightRouter from './routers/highlightRouter';
import handleExpressException from './util/errorHandler';

const routers = [
  {
    path: '/highlight',
    router: highlightRouter,
  },
];

export const corsOptions = {
  credentials: true,
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'sentry-trace'],
  // origin: [process.env.BASE_URL],
};

BF3DataSource.initialize()
  .then(() => {
    console.log('DB connected.');

    const app = express();
    const port = process.env.PORT || 4000;

    app.set('trust proxy', true);

    app.use(cors(corsOptions));
    app.use(express.json({ limit: '50MB' }));

    app.use(
      morgan('[:date[web] :remote-addr] ":method :url" :status :response-time'),
    );

    routers.forEach((routerConfig) => {
      app.use(routerConfig.path, routerConfig.router);
    });

    app.listen(port, () => {
      return console.log(`BF3 Server is listening at http://localhost:${port}`);
    });

    app.use(handleExpressException);
  })
  .catch((err: Error) => console.error(err));
