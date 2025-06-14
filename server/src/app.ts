import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import AuthRouter from "./routes/auth";
import logger from "./utils/logger";

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`New Request: ${req.url}, ${JSON.stringify(req.body)}`);
    next();
})

app.get('/uptime', (req: Request, res: Response)=>{
    res.send('Up');
})
app.use(AuthRouter);

// TODO: use error handler middleware

export default app;