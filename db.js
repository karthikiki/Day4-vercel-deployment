import {MongoClient}  from "mongodb"
import OBJ from "mongodb"

const MongoURL =  "mongodb+srv://Karthick:AMpaDWlI0XHeuzmV@cluster0.tkmk9sb.mongodb.net/?retryWrites=true&w=majority"
async function createConnection(){
   const client = new MongoClient(MongoURL);
   await client.connect()
   console.log("MongoDb is connected succesfully")
    return client;
}

export var ObjectId = OBJ.ObjectId;
export const client = await createConnection();