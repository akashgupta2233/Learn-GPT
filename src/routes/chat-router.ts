import { Router } from "express";
import { verifytoken } from "../utils/jwt-token-generator.js";
import { chatCompletionValidator, validate } from "../utils/data-validators.js";
import { generateChatCompletion , sendChatsToUser , deleteChats} from "../controllers/chat-controllers.js";

const chatRoutes = Router();
chatRoutes.post(
    "/new",
     validate(chatCompletionValidator) , 
     verifytoken , 
     generateChatCompletion
    );

chatRoutes.get(
    "/all-chats",
     verifytoken , 
     sendChatsToUser
    );

chatRoutes.delete(
    "/delete",
     verifytoken , 
     deleteChats
    );

export default chatRoutes;