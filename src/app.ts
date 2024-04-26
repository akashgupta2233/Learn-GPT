import {config} from "dotenv"
import morgan from 'morgan'
import express from 'express'
import cookieParser from "cookie-parser";
import appRouter from "./routes/index.js";
import cors from "cors";
config();

const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(morgan("dev"));    //  <-- production ke baad hatana he
app.use(cookieParser(process.env.COOKIE_SECRET));
 
app.use('/api/v1',appRouter);
// app.use('/chats');   
  
export default app;   
