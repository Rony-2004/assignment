import React, { useState, useMemo } from 'react';
import { useStudents } from '../context/StudentsContext';
import { Search, CheckCircle, XCircle, Mail, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Students: React.FC = () => {
  const { students } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    
    return students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  if (students.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading students..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Students</h1>
          <p className="text-gray-600">Manage student fee payment status</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {student.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Fee Status:</span>
                  <div className="flex items-center space-x-2">
                    {student.feesPaid ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-green-700">Paid</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-red-700">Unpaid</span>
                      </>
                    )}
                  </div>
                </div>
                
                {student.feesPaid && student.paymentDate && (
                  <div className="mt-2 text-xs text-gray-500">
                    Paid on: {new Date(student.paymentDate).toLocaleDateString()}
                  </div>
                )}
                
                <div className="mt-2 text-sm text-gray-600">
                  Amount: ${student.feeAmount.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500">No students found matching "{searchTerm}"</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;