import {AwilixContainer} from "awilix";
import {Router} from "express";
import PublicRouter from "./v1/public/PublicRouter";
import {container} from "../di";
const router: Router = Router();
const containerScope: AwilixContainer = container.createScope();

router.get('/', (_req: any, res: any) => {
    res.send('Hello World!');
});

router.use('/wallet-service/v1/public', PublicRouter(containerScope))

export {router};