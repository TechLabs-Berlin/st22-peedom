const {MongoClient} = require('mongodb');
async function main() {
    //for Password see Project Notion
    const uri = "mongodb+srv://admin:PASSWORD@PeedomDB.gr9rk.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useUnifiedTopology: false});
    try {
        // Connect to the MongoDB cluster
        //.connect could throw error so use await
        await client.connect();

        await listDatabases(client);
 
        // // Make the appropriate DB calls
        // await createListing(client, {
        //     name: "Lovely Loft",
        //     summary: "A charming loft in Paris"
        // })
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//call function
main().catch(console.error);

//list Databases
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


