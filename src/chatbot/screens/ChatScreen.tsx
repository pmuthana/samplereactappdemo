{/* 
 * 
 */}
import ChatCard from '@/chatbot/components/ChatCard';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppSidebar from '../components/AppSideBar';
import { SidebarProvider } from '@/shared/components/ui/sidebar';


export default function ChatScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [chatKey, setChatKey] = useState(0); 
    const [searchParams] = useSearchParams();
    const appName = searchParams.get('app_name') || 'cloud_observability_agent';

    function advanceStage(step: number) {
        console.log(currentStep)
        setCurrentStep((prev) => prev + step); //setCurrentStep(currentStep+step);
    };

    const handleNewChat = () => {
        setChatKey((prev) => prev + 1);
    };

    return (
        <div className='flex h-screen overflow-hidden'>
            <div className="w-64 h-screen fixed">
                <SidebarProvider>
                    <AppSidebar onNewChat={handleNewChat} />
                </SidebarProvider>
                
            </div>
            <div className='flex-1 ml-64 h-100 flex flex-col bg-gray-50'>
                <ChatCard key={`${appName}-${chatKey}`} advanceStage={advanceStage} />
            </div>
        </div>
    );
};