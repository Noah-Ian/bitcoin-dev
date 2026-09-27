import express from 'express';
import walletRoutes from './routes/wallet.route.js';
import transactionRoutes from "./routes/transaction.route.js";
import blockchainRoutes from "./routes/blockchain.route.js";

const app = express();

app.use(express.json());

app.use('/wallet', walletRoutes);

app.use('/transaction', transactionRoutes);

app.use('/blockchain', blockchainRoutes);

export default app;