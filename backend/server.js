import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use('/api/employees', employeeRoutes);
app.get('/', (req, res) => {
    res.json({
        message: 'EMS Backend is running successfully!',
        application: 'Employee Management System'
    });
});
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'EMS API is working'
    });
});
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`EMS Server running at http://localhost:${PORT}`);
    });
};
startServer();