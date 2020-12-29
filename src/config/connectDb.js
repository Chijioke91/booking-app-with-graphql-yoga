import { connect } from 'mongoose';

export default async function () {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e) {
    console.error(e.message);
  }
}
