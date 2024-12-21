import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('Database is already connected');
    return;
  }

  if (connectionState === 2) {
    console.log('Database is connecting...');
    return;
  }

  try {
    mongoose.connect(MONGODB_URL!, {
      dbName: 'nextjs-ecom',
      bufferCommands: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error', error);

    throw new Error('Database connection error');
  }
};

export default connect;
