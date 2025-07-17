import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentsContext';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Edit2, Save, X, CreditCard, CheckCircle, Calendar } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile: React.FC = () => {
  const { currentStudent, updateStudent } = useStudents();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentStudent?.name || '',
    email: currentStudent?.email || ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!currentStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading profile..." />
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!editForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!editForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    updateStudent(currentStudent.id, {
      name: editForm.name.trim(),
      email: editForm.email.trim()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: currentStudent.name,
      email: currentStudent.email
    });
    setErrors({});
    setIsEditing(false);
  };

  const handlePayFees = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and fee payments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Student Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-3 py-1 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                ) : (
                  <p className="text-gray-900">{currentStudent.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                ) : (
                  <p className="text-gray-900">{currentStudent.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Fee Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Fee Management</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Total Fee Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${currentStudent.feeAmount.toLocaleString()}</p>
                </div>
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-700">Payment Status:</span>
                  <div className="flex items-center space-x-2">
                    {currentStudent.feesPaid ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-green-700">Paid</span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-red-700">Unpaid</span>
                      </>
                    )}
                  </div>
                </div>

                {currentStudent.feesPaid ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Payment Confirmed</span>
                    </div>
                    {currentStudent.paymentDate && (
                      <div className="flex items-center space-x-2 text-sm text-green-700">
                        <Calendar className="w-4 h-4" />
                        <span>Paid on {new Date(currentStudent.paymentDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <X className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-800">Payment Required</span>
                    </div>
                    <p className="text-sm text-red-700 mb-4">
                      Your fee payment is currently outstanding. Please complete your payment to continue.
                    </p>
                    <button
                      onClick={handlePayFees}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      Pay Fees Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;