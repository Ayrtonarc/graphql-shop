import express from 'express';
import cors from 'cors';
import compression from "compression";
import { createServer } from 'http';


const app = express();

app.use(cors());

app.use(compression())

app.get('/', (req, res) => {
     res.send('API')
  });

const httpServer = createServer(app);

httpServer.listen({
    port: 2002
},
() => console.log('http://localhost:2002')
);
