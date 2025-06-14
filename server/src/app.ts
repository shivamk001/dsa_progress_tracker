import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import AuthRouter from "./routes/auth";
import ProblemsRouter from './routes/problem';
import UserRouter from './routes/user';
import logger from "./utils/logger";
import { Env } from "./utils/env";

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
    signed: false,
    secure: process.env['NODE_ENV']=='production',
    // domain: process.env.COOKIE_DOMAIN
}))

app.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`New Request: ${req.url}, ${req.method}, ${JSON.stringify(req.body)}`);
    next();
})

app.get('/uptime', (req: Request, res: Response)=>{
    res.send('Up');
})

app.use(AuthRouter);

app.use(ProblemsRouter);

app.use(UserRouter);

// TODO: use error handler middleware

export default app;