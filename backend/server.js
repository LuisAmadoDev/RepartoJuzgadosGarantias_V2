import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/routes.js';
const app = express();

dotenv.config();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies  
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use("/api/case-assignments", router);

app.get('/', (req, res) => { 
  res.send('Hello, World!');
});

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI;

//Servidor con express y conexión a MongoDB
const startServer = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}
startServer();