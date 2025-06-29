import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

// Load environment variables from config.env
dotenv.config({ path: "./config.env" });

// Debug log to confirm the URI is being loaded
console.log("Loaded ATLAS_URI:", process.env.ATLAS_URI);

// Validate URI
const uri = process.env.ATLAS_URI;
if (!uri) {
  throw new Error("Missing ATLAS_URI in environment configuration.");
}

// Create a new MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("✅ Connected to MongoDB successfully");
  db = client.db("employees");
} catch (err) {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1); // Exit the app if DB connection fails
}

export default db;