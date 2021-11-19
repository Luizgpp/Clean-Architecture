import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const mongoClient: MongoClient = new MongoClient(url);

export async function connect() {
    await mongoClient.connect();

    const db = await mongoClient.db('ParkedLot');

    return db;
}

export async function closeCon() {
    mongoClient.close();
}