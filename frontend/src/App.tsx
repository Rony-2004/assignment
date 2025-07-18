import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StudentsProvider } from './context/StudentsContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Students from './pages/Students';
import Profile from './pages/Profile';
import Payment from './pages/Payment';

function App() {
  return (
    <AuthProvider>
      <StudentsProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <Navigation />
                    <Routes>
                      <Route path="/" element={<Navigate to="/students" replace />} />
                      <Route path="/students" element={<Students />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/payment" element={<Payment />} />
                    </Routes>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </StudentsProvider>
    </AuthProvider>
  );
}

export default App;