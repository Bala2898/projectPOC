const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json());

const mongoURL = 'mongodb+srv://balamuruganbalabc:Bala%402898@poc.sbzzl.mongodb.net/?retryWrites=true&w=majority&appName=POC';
const dbName = 'DEV';
const collectionName = "patientTreatment";

class MongoDBConnector {
    constructor() {
        this.client = new MongoClient(mongoURL);
        this.db = null;
        this.collection = null;
    }

    async connect() {
        try {
            console.log('Connecting to MongoDB...');
            await this.client.connect();
            this.db = this.client.db(dbName);
            this.collection = this.db.collection(collectionName);
            console.log('Connected to MongoDB successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
            throw error;
        }
    }
}

const dbConnector = new MongoDBConnector();
dbConnector.connect();

app.post('/insert', async (req, res) => {
    try {
        const result = await dbConnector.collection.insertOne(req.body);
        res.json({ message: 'Data inserted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error });
    }
});

app.put('/update', async (req, res) => {
    try {
        const { query, newData } = req.body;
        const result = await dbConnector.collection.updateOne(query, { $set: newData });
        res.json({ message: 'Data updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error });
    }
});

app.get('/retrieve', async (req, res) => {
    try {
        const query = req.query;
        const result = await dbConnector.collection.findOne(query);
        res.json({ message: 'Data retrieved successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
});

app.get('/retrieveAll', async (req, res) => {
    try {
        const result = await dbConnector.collection.find({}).toArray();
        res.json({ message: 'All data retrieved successfully', totalRecords: result.length, result });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving all data', error });
    }
});

app.delete('/delete', async (req, res) => {
    try {
        const query = req.body;
        const result = await dbConnector.collection.deleteOne(query);
        res.json({ message: 'Data deleted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
