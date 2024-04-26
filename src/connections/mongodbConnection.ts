import {connect,disconnect } from 'mongoose'  ;
  
const connectToMongoDB = async() => {
    try{
      await connect(process.env.MONGODB_URL);
    } catch(error){
       console.log(error);
       throw new Error("Unable to connect to Database");
    }
};  
 
const disconnectFromdb = async() =>{
  try{
         await disconnect();
  } catch(error){
    console.log(error);
    throw new Error("Unable to disconnect to Database");
  }
}

export { connectToMongoDB, disconnectFromdb };