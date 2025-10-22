import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/routes.js';
import authRoutes from './routes/authRoutes.js'; 
import adminUserRoutes from "./routes/adminUserRoutes.js";

const app = express();// Crear instancia de Express
dotenv.config();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies  
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use("/api/auth", authRoutes);// rutas de autenticación
app.use("/api/admin/users", adminUserRoutes);// rutas de admin
app.use("/api/case-assignments", router);// rutas de app

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