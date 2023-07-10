import express from 'express';
import cors from 'cors';
import compression from "compression";
import { createServer } from 'http';
import enviroments from './config/enviroments';
//configuracion de las variables de entorno (lectura)
if(process.env.NODE_ENV !== 'production'){
  const env = enviroments;
  console.log(env);
}



async function init() {
  const app = express();

  app.use(cors());

  app.use(compression())

  app.get('/', (req, res) => {
    res.send('API')
  });
  const PORT = process.env.PORT || 2002
  const httpServer = createServer(app);

  httpServer.listen({
    port: PORT
  },
    () => console.log(`http://localhost:${PORT}`)
  );

}
init();