{/*
 * 
 */}
import ChatMessage, { Message } from "@/shared/components/ChatMessage";
import ChatList from "@/shared/components/ChatList";
import ChatInput from "@/shared/components/ChatInput";
import React, { useEffect, useState } from "react";

const getInitialMessage = (): Message => {
    return {
        type: "received",
        text: "Welcome to MDF Chatbot!  \n\n "
    };
};

interface ChatCardProps {
    advanceStage: (step: number) => void;
};


export default function ChatCard({ advanceStage }: ChatCardProps) {

    // Map frontend app names to backend API endpoints
    const getBackendEndpoint = (): string => {
        return 'cloud-obs';
    };

    const backendEndpoint = getBackendEndpoint();

    const [messages, setMessages] = useState([getInitialMessage()]);
    const [waiting, setWaitStatus] = useState(false);
    const [complete, setCompletionStatus] = useState(false);
    const [sessionID, setSessionID] = useState("");


    useEffect(() => {
        
        // Reset session when backend endpoint changes (app switches)
        setSessionID("");
        setMessages([getInitialMessage()]);

        fetch(`/api/${backendEndpoint}/session`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Session endpoint not available: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                setSessionID(data.session_id);
            })
            .catch((error) => {
                const errorMessage: Message = {
                    type: 'received',
                    text: `❌ Error: Unable to connect to backend service.\n\nPlease ensure the backend service is running and try again.\n\nError: ${error.message}`
                };
                setMessages([errorMessage]);
            });

        return () => setSessionID("");
    }, [backendEndpoint])


    async function addMessage(e: React.SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & { textarea: { value: string } };
        const newMessage: Message = {
            type: 'sent',
            text: target.textarea.value.trim(),
        };
        const loadingIcon: Message = {
            type: 'loading',
        };

        setMessages(oldMessages => [
            ...oldMessages,
            newMessage,
            loadingIcon,
        ]);
        setWaitStatus(true);

        await fetch(`/api/${backendEndpoint}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "session_id": sessionID,
                "message": newMessage.text,
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    const responseMessage: Message = {
                        type: 'received',
                        text: "Sorry, an error occurred. Please refresh and try again."
                    };
                    setMessages(oldMessages => oldMessages.map(m => {
                        if (m.type === 'loading')
                            return responseMessage;
                        return m;
                    }));
                }
            })
            .then((data) => {
                if (data && data.response) {
                    const responseMessage: Message = {
                        type: 'received',
                        text: data.response,
                    };
                    setMessages(oldMessages => oldMessages.map(m => {
                        if (m.type === 'loading')
                            return responseMessage;
                        return m;
                    }));

                    if (messages.length >= 25) {
                        advanceStage(2);
                        setCompletionStatus(true);
                    }
                    if (messages.length < 3) {
                        advanceStage(1);
                    }
                } else {
                    throw new Error('Invalid response format');
                }
            })
            .catch((e) => {
                console.log(e);
                const errorMessage: Message = {
                    type: 'received',
                    text: "Sorry, an error occurred. Please check if the backend service is running and try again."
                };
                setMessages(oldMessages => oldMessages.map(m => {
                    if (m.type === 'loading')
                        return errorMessage;
                    return m;
                }));
            });

        setWaitStatus(false);
    }

    return (
        <div className="h-full w-full bg-white space-y-4 flex flex-col items-center">
            <ChatList>
                {messages.map((m, index) =>
                    <ChatMessage
                        type={m.type}
                        key={index}
                        text={m.text}
                    />
                )}
            </ChatList>
            <ChatInput
                addMessage={addMessage}
                waiting={waiting}
                complete={complete}
                getReport={null}
            />
        </div>
    );
};
