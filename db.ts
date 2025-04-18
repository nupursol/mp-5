import {MongoClient, Db, Collection } from "mongodb";

const MONGO_URI= process.env.MONGO_URI as string; //get uri from env file
if (!MONGO_URI) { //crash the app if uri is missing
    throw new Error("Mongo_URI environment variable is undefined");
}

const DB_NAME = "url-shortener"; //db name used in the project
export const URLS_COLLECTION = "urls"; //collection name used in the project

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> { // connect to the database
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

//function to grab collection from mongo
export default async function getCollection(collectionName: string) : Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}