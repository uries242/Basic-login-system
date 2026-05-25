import "dotenv/config"; 
import express from 'express'; 
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
const uri = process.env.MONGO_URI;


const app = express(); 
app.use(express.json());
app.use('/api/users', userRoutes);


mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

  