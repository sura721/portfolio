import mongoose from 'mongoose'


export const connectToDB = async () => {


  try {
    await mongoose.connect(process.env.MONGO_URL!)

    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
  }
}
