import express from 'express';
import routes from './routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();

app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.listen(8090); //todo: metti in env
app.use(routes);
app.use((req,res)=> {
    res.status(404).send("404: Resource not found")
});