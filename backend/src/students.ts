import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from './generated/prisma';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Extend Express Request to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware to check JWT
function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all students
router.get('/', auth, async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

// Get current student profile
router.get('/me', auth, async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const student = await prisma.student.findFirst({ where: { userId } });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// Update student profile
router.put('/me', auth, async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { name, email } = req.body;
  const student = await prisma.student.findFirst({ where: { userId } });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const updated = await prisma.student.update({ where: { id: student.id }, data: { name, email } });
  res.json(updated);
});

// Simulate payment
router.post('/me/pay', auth, async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const student = await prisma.student.findFirst({ where: { userId } });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const updated = await prisma.student.update({ where: { id: student.id }, data: { feesPaid: true, paymentDate: new Date() } });
  res.json(updated);
});

export default router; 