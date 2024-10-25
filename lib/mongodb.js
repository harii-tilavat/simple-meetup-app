import { MongoClient } from "mongodb";
let cachedClient = null;
export async function connectToDB() {
  //   const client = new MongoClient(process.env.MONGODB_URI);
  //   await client.connect();
  //   return client;

  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return cachedClient;
}
