import express from 'express';
import "dotenv/config";
import walletRoutes from './routes/wallet.route.js';
import transactionRoutes from "./routes/transaction.route.js";
import blockchainRoutes from "./routes/blockchain.route.js";
import paymentRoutes from "./routes/payment.route.js";
import lndRoutes from "./routes/lnd.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use('/wallet', walletRoutes);

app.use('/transaction', transactionRoutes);

app.use('/blockchain', blockchainRoutes);

app.use('/payment', paymentRoutes); 

app.use('/lnd', lndRoutes);

app.use(errorHandler);

export default app;