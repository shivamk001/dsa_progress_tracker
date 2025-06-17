import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import cors from 'cors';
import AuthRouter from "./routes/auth";
import ProblemsRouter from './routes/problem';
import UserRouter from './routes/user';
import logger from "./utils/logger";
import { Env } from "./utils/env";
import errorHandlingMiddleware from "./middlewares/errorHandler";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

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

app.get('/dsaapi/uptime', (req: Request, res: Response)=>{
    res.send('Up');
})

app.use(AuthRouter);

app.use(ProblemsRouter);

app.use(UserRouter);

app.use(errorHandlingMiddleware);

export default app; 
