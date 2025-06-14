declare global{
    namespace Express {
        interface Request {
            session: any;
            currentUser: any;
        }
    }
}

import mongoose from "mongoose";

import app from "./app";
import logger from "./utils/logger";
import { Env } from "./utils/env";


let startServer = async () =>{

    Env.init();

    let mongoDbUrl = Env.get('MONGODB_URL');
    // connect to mongoose
    await mongoose.connect(mongoDbUrl);
    logger.info(`Mongoose connected:, ${mongoose.connection.readyState}`);

    let port = Env.get('APP_PORT');
    app.listen(port, ()=>{
        console.log('App started', port);
    });
}

startServer()
.then(()=>{
    logger.info('Server started!');
})
.catch((err)=>{
    logger.info('Error starting server', err);
})