import express from 'express';
import injectMiddlewares from './libs/middlewares';
import injectRoutes from './routes';
import startServer from './libs/boot';

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
