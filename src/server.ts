import express from 'express';
import cors from 'cors';
import compression from "compression";
import { createServer } from 'http';
import enviroments from './config/enviroments';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayground from 'graphql-playground-middleware-express';
//configuracion de las variables de entorno (lectura)
if(process.env.NODE_ENV !== 'production'){
  const env = enviroments;
  console.log(env);
}



async function init() {
  const app = express();

  app.use(cors());

  app.use(compression())
  
  const server = new ApolloServer({
      schema,
      introspection: true
  });
server.applyMiddleware({app});

  app.get('/', expressPlayground({
    endpoint: '/graphql'
  }));
  
  const PORT = process.env.PORT || 2002
  const httpServer = createServer(app);

  httpServer.listen({
    port: PORT
  },
    () => console.log(`http://localhost:${PORT}`)
  );

}
init();