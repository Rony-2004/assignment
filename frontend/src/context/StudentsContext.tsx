import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Student, StudentsContextType } from '../types/index';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../api';

interface StudentsState {
  students: Student[];
  currentStudent: Student | null;
}

type StudentsAction = 
  | { type: 'SET_STUDENTS'; payload: Student[] }
  | { type: 'SET_CURRENT_STUDENT'; payload: Student | null }
  | { type: 'UPDATE_STUDENT'; payload: { id: string; updates: Partial<Student> } }
  | { type: 'UPDATE_FEE_STATUS'; payload: { id: string; paid: boolean; paymentDate?: string } };

const studentsReducer = (state: StudentsState, action: StudentsAction): StudentsState => {
  switch (action.type) {
    case 'SET_STUDENTS':
      return { ...state, students: action.payload };
    case 'SET_CURRENT_STUDENT':
      return { ...state, currentStudent: action.payload };
    case 'UPDATE_STUDENT':
      const updatedStudents = state.students.map(student =>
        student.id === action.payload.id
          ? { ...student, ...action.payload.updates }
          : student
      );
      const updatedCurrentStudent = state.currentStudent?.id === action.payload.id
        ? { ...state.currentStudent, ...action.payload.updates }
        : state.currentStudent;
      return {
        ...state,
        students: updatedStudents,
        currentStudent: updatedCurrentStudent
      };
    case 'UPDATE_FEE_STATUS':
      const studentsWithUpdatedFees = state.students.map(student =>
        student.id === action.payload.id
          ? { 
              ...student, 
              feesPaid: action.payload.paid,
              paymentDate: action.payload.paymentDate || student.paymentDate
            }
          : student
      );
      const currentStudentWithUpdatedFees = state.currentStudent?.id === action.payload.id
        ? { 
            ...state.currentStudent, 
            feesPaid: action.payload.paid,
            paymentDate: action.payload.paymentDate || state.currentStudent.paymentDate
          }
        : state.currentStudent;
      return {
        ...state,
        students: studentsWithUpdatedFees,
        currentStudent: currentStudentWithUpdatedFees
      };
    default:
      return state;
  }
};

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export const useStudents = (): StudentsContextType => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
};

export const StudentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(studentsReducer, {
    students: [],
    currentStudent: null
  });
  const { user } = useAuth();

  // Helper to get auth token
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/students`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        dispatch({ type: 'SET_STUDENTS', payload: res.data });
      } catch {}
    };
    if (user) fetchStudents();
  }, [user]);

  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/students/me`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        dispatch({ type: 'SET_CURRENT_STUDENT', payload: res.data });
      } catch {
        dispatch({ type: 'SET_CURRENT_STUDENT', payload: null });
      }
    };
    if (user) fetchCurrent();
  }, [user]);

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/students/me`, updates, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      dispatch({ type: 'UPDATE_STUDENT', payload: { id, updates: res.data } });
    } catch {}
  };

  const updateFeeStatus = async (id: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/students/me/pay`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      dispatch({ type: 'UPDATE_FEE_STATUS', payload: { id, paid: res.data.feesPaid, paymentDate: res.data.paymentDate } });
    } catch {}
  };

  const getStudentById = (id: string): Student | undefined => {
    return state.students.find(student => student.id === id);
  };

  const value: StudentsContextType = {
    students: state.students,
    currentStudent: state.currentStudent,
    updateStudent,
    updateFeeStatus,
    getStudentById
  };

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
};