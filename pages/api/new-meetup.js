import { MongoClient } from "mongodb";
import { connectToDB } from "../../lib/mongodb";
// POST /api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const client = await connectToDB();
    try {
      const data = req.body;
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const result = await meetupCollection.insertOne(data);
      res.status(201).json({ message: "Meetup created!", result });
    } catch (error) {
      console.log("ERROR COMING: ", error);
      res.status(400).json({ message: "Something went wrong!", error });
    } finally {
      client.close();
    }
  }
}
export default handler;
