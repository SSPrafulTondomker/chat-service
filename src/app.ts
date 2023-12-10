import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import {router} from "./router";

const app: express.Application = express();

// @ts-ignore
app.use(compression({ filter: (req, res) => {
        if (req.path === '/metrics') {
            return false;
        }
        return compression.filter(req, res);
    }}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

export default app;
