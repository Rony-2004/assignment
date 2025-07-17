export interface Student {
  id: string;
  name: string;
  email: string;
  feesPaid: boolean;
  paymentDate?: string;
  password: string;
  feeAmount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface PaymentData {
  amount: number;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface StudentsContextType {
  students: Student[];
  currentStudent: Student | null;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  updateFeeStatus: (id: string, paid: boolean, paymentDate?: string) => void;
  getStudentById: (id: string) => Student | undefined;
}