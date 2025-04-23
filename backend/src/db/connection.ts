import {connect, disconnect} from 'mongoose';

async function connectToDatabase() {
  try{
    await connect(process.env.MONGODB_URL)
  }catch(error){
    throw new Error("cannot connect to mongodb")
  }
}

async function disconnectFromDatabase() {
  try{
    await disconnect();
  }catch(error){
    console.log(error);
    throw new Error("cannot disconnect to mongodb")
  }
}

export {connectToDatabase, disconnectFromDatabase}