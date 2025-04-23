import User from "../models/user.js";
import { OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not Registered or Malfunctioned" });
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: chats });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token Malfunction");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission Didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token Malfunction");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission Didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map