import express from "express";
import router from "./routes/index.js";
import db from './config/db.js';
import dotenv from 'dotenv'
dotenv.config({ path: './variables.env' })

const app = express();

// Conectar la base de datos
db.authenticate()
  .then(() => console.log('Connect Data Base'))
  .catch( error => console.log(error));

//habilitar motor de templates
app.set('view engine', 'pug');

//access to absolute path folder view
app.set('views', 'server/views');

// get year current
//con next vamos al siguiente middlewere, es importante por si no usamos next no continua con el codigo que sigue
app.use((req, res, next) => {
  const year = new Date();

  res.locals.currentYear = year.getFullYear();
  res.locals.nameSite = "Agency Travels";
  next();
})

//add body parse to read form data
app.use(express.urlencoded({extended: true}));


//definir la carpeta publica
app.use(express.static('public'));

app.use('/', router);

/**
 * port and host to the app
 */

const host = process.env.HOST || 9000;
const port = process.env.PORT || 9000;

app.listen(port, host, () => {
  console.log(`server listen in port ${port}`);
})
