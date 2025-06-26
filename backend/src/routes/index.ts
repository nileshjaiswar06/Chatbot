import { Router } from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';
import imageRoutes from './image-routes.js'

const appRouter = Router();

appRouter.use("/user", userRoutes)
appRouter.use("/chat", chatRoutes);
appRouter.use("/image", imageRoutes)

export default appRouter;