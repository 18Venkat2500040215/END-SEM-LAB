
require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function main() {
  try {
    await client.connect();
    console.log("MongoDB Connected Successfully!");

    const db = client.db("MovieDB");
    const movies = db.collection("Movies");

    // CREATE
    await movies.insertOne({
      name: "RRR",
      hero: "Ram Charan",
      rating: 9
    });
    console.log("Movie Inserted!");

    // READ
    const data = await movies.find().toArray();
    console.log("Movies:", data);

    // UPDATE
    await movies.updateOne(
      { name: "RRR" },
      { $set: { rating: 10 } }
    );
    console.log("Movie Updated!");

    // DELETE
    await movies.deleteOne({ name: "RRR" });
    console.log("Movie Deleted!");

  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await client.close();
  }
}

main();
