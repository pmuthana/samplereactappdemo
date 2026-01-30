{/* 
 * 
 */}
import { Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import '@/chatbot/App.css';
import ChatScreen from '@/chatbot/screens/ChatScreen';
import Title from '@/shared/components/Title';
import Footer from '@/shared/components/Footer';

export default function ChatbotAgent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const appName = searchParams.get('app_name') || 'cloud_observability_agent';
  
  // Map app names to display names
  const getDisplayName = (appName: string): string => {
    const displayNames: { [key: string]: string } = {
      'cloud_observability_agent': 'Chatbot Agent'
    };
    return displayNames[appName] || 'AI Assistant';
  };
  
  return (
    <div className="h-screen flex flex-col">
      <Title text={getDisplayName(appName)} />
      <Routes>
        <Route path="chat" element={<ChatScreen />} />
        <Route path="*" element={<Navigate to={`chat${location.search}`} replace />} />
      </Routes>
      <Footer />
    </div>
  );
}