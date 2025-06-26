import { Request, Response, NextFunction} from "express";
import User from "../models/user.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openai-config.js";
import { Document } from "mongoose";

interface IChat {
  role: string;
  content: string;
}

interface IConversation {
  title: string;
  chats: IChat[];
  timestamp: Date;
}

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  conversations: IConversation[];
}

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;
  
    const user = await User.findById(res.locals.jwtData.id) as IUser;

    if(!user) return res.status(401).json({message: "User not Registered or Malfunctioned"});

    // Get current conversation or create new one
    let currentConversation = user.conversations?.length 
      ? user.conversations[user.conversations.length - 1] 
      : { chats: [], title: "New Conversation", timestamp: new Date() };

    if (!currentConversation || !currentConversation.chats?.length) {
      const newConversation: IConversation = {
        title: message.length > 30 ? message.substring(0, 30) + "..." : message,
        chats: [],
        timestamp: new Date()
      };
      if (!user.conversations) {
        user.conversations = [newConversation];
      } else {
        user.conversations.push(newConversation);
      }
      currentConversation = user.conversations[user.conversations.length - 1];
    }

    // Format system message
    const systemMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: `You are a helpful assistant. Current date is ${new Date().toLocaleDateString()}. Provide accurate, direct responses.`
    };

    // Get chat history and add system message
    const chats = currentConversation.chats.map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
    chats.unshift(systemMessage);
    chats.push({role: "user", content: message});

    // Add user message to conversation
    currentConversation.chats.push({role: "user", content: message});

    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // Get completion from OpenAI
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: chats,
      temperature: 0.7,
      max_tokens: 200,
    });

    // Add assistant's response to conversation
    const assistantMessage = chatResponse.data.choices[0].message?.content;
    if (assistantMessage) {
      currentConversation.chats.push({role: "assistant", content: assistantMessage});
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      chats: currentConversation.chats,
      title: currentConversation.title
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Something went wrong"});
  }
};

export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).send("User not registered or Token Malfunction");
    }

    if(user._id.toString() !== res.locals.jwtData.id){
      return res.status(401).send("Permission Didn't match");
    }

    return res.status(200).json({ message: "OK", conversations: user.conversations });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id) as IUser;
    if (!user) return res.status(401).json({message: "User not registered or Token malfunctioned"});

    // Clear all conversations
    user.conversations = [];
    await user.save();

    return res.status(200).json({message: "OK"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error while deleting chats"});
  }
};

export const getAllChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id) as IUser;
    if (!user) return res.status(401).json({message: "User not registered or Token malfunctioned"});

    // Get the current conversation or return empty
    const currentConversation = user.conversations?.length 
      ? user.conversations[user.conversations.length - 1] 
      : { chats: [], title: "New Conversation", timestamp: new Date() };

    return res.status(200).json({
      chats: currentConversation.chats,
      title: currentConversation.title
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error while getting chats"});
  }
};