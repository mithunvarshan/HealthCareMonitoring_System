import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import patientRouter from './routes/patientRoute.js';
import { Server } from 'socket.io';
import http from 'http';

// app config
const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app); // Create HTTP server for WebSockets
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Connect to database and cloud services
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api', patientRouter);

// WebSocket connection
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Handle client disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// Expose `io` for controllers to use
export { io };

// api endpoints
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// start server
server.listen(port, () => console.log(`Server Started on port ${port}`));
