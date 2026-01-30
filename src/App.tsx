{/* 
 * 
 */}
import '@/App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginScreen from '@/login/LoginScreen';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import ChatbotAgent from '@/chatbot/App';


function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/chatbot/*"
            element={
              <ProtectedRoute>
                <ChatbotAgent />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;