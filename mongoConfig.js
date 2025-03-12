
 
export class mongoDBconnectos {

    // Connecting to mongoBD
    async connect(url, dbName) {
        try {
            console.log('Connecting to MongoDB......');
            client = new MongoClient(url);
            await client.connect();
            db = client.db(dbName);
            console.log('Connected to MongoDB successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
    // Disconnecting to mongoBD
    async disconnect() {
        try {
            await client.close();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
            throw error;
        }
    }
    // Creating a collection in mongoDB
    async createCollection(collectionName) {
        try {
 
            collection = await db.createCollection(collectionName);
            console.log("Collection created successfully");
        } catch (error) {
            console.error("Error creating collection ", error);
            throw error;
        }
    }
    // Inserting a data to a collection in mongoDB
    async insertData(collectionName, data) {
        try {
            const Result = await collection.insertOne(data);
            console.log('Data inserted successfully', JSON.stringify(Result));
        } catch (error) {
            console.error('Error inserting data:', error);
            throw error;
        }
    }
    // Update a data to a collection in mongoDB
    async updateData(collectionName, query, newData) {
        try {
            const Result = await collection.updateOne(query, { $set: newData });
            console.log('Data updated successfully', JSON.stringify(Result));
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }
    // Retriving a data to a collection in mongoDB
    async retrieveData(collectionName, query) {
        try {
            const Result = await collection.findOne(query);
            console.log('Data retrived successfully with filter ', JSON.stringify(query), JSON.stringify(Result));
        } catch (error) {
            console.error('Error retrieving data:', error);
            throw error;
        }
    }
    // Retriving all data to a collection in mongoDB
    async retrieveAllData(collectionName) {
        try {
            const Result = await collection.find({});
            console.log('Data retrived successfully & total no of record are ', (Result && Result.length) > 0 ? Result.length : 0 );
        } catch (error) {
            console.error('Error retrieving data:', error);
            throw error;
        }
    }
    // Deletind a data to a collection in mongoDB
    async deleteData(collectionName, query) {
        try {
            await collection.deleteOne(query);
            console.log('Data deleted successfully');
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
    // // Deletind all data to a collection in mongoDB
    // async deleteall(){
    //     try{
    //         await collection.deleteMany()
    //         console.log("Deleting all")
    //     }
    //     catch(error){
    //         console.log("error while deleting")
    //     }
    // }
}