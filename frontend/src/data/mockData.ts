import type { Student } from '../types/index';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    feesPaid: true,
    paymentDate: '2024-01-15',
    password: 'password123',
    feeAmount: 5000
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    feesPaid: false,
    password: 'password123',
    feeAmount: 5000
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    feesPaid: true,
    paymentDate: '2024-01-20',
    password: 'password123',
    feeAmount: 5000
  },
  {
    id: '4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    feesPaid: false,
    password: 'password123',
    feeAmount: 5000
  },
  {
    id: '5',
    name: 'Edward Wilson',
    email: 'edward@example.com',
    feesPaid: true,
    paymentDate: '2024-01-10',
    password: 'password123',
    feeAmount: 5000
  }
];