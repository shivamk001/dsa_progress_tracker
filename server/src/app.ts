import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import AuthRouter from "./routes/auth";
import ProblemsRouter from './routes/problem';
import logger from "./utils/logger";

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`New Request: ${req.url}, ${req.method}, ${JSON.stringify(req.body)}`);
    next();
})

app.get('/uptime', (req: Request, res: Response)=>{
    res.send('Up');
})

app.use(AuthRouter);

app.use(ProblemsRouter);

// TODO: use error handler middleware

export default app;