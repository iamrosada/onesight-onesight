
import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL as string

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}


var cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect


// import { MongoClient, Db, Collection } from 'mongodb'

// const url = process.env.DATABASE_URL as string
// const client = new MongoClient(url)

// interface ConnectType {
//   db: Db;
//   client: MongoClient

// }

// export default async function connect(): Promise<ConnectType> {
//   if (!client.isConnected()) await client.connect();

//   const db = client.db("onesight")
//   return { db, client }
// }
