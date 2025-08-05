import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudnary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripWebHooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// Allow Multiple origins
const allowedOrigins = [
    'http://localhost:5173', 
    'https://affrontend.vercel.app' // Add your actual frontend domain
];

app.post('/stripe', express.raw({type: "application/json"}), stripWebHooks);

// Middleware Configration
app.use(express.json());
app.use(cookieParser());

// CORS configuration for production
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow all Vercel domains in production
        if (process.env.NODE_ENV === 'production') {
            if (origin.includes('vercel.app') || origin.includes('localhost')) {
                // console.log('CORS - Allowing origin:', origin);
                return callback(null, true);
            }
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            // console.log('CORS - Allowing origin:', origin);
            callback(null, true);
        } else {
            // console.log('CORS - Blocking origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

app.get('/', (req, res) => res.send('API is Working'));

// Test endpoint to check cookies
app.get('/api/test-cookie', (req, res) => {
    console.log('Test endpoint - All cookies:', req.cookies);
    console.log('Test endpoint - Token cookie:', req.cookies.token);
    res.json({
        success: true,
        cookies: req.cookies,
        hasToken: !!req.cookies.token,
        environment: process.env.NODE_ENV
    });
});
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () =>{
    console.log(`Server is Running on http://localhost:${port}`);
});