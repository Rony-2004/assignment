import express, { Request, Response } from 'express';
import { PrismaClient } from './generated/prisma';
import authRoutes from './auth';
import studentRoutes from './students';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', error: String(err) });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the TypeScript backend!');
});

app.listen(port, async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
  console.log(`Server is running on http://localhost:${port}`);
}); 