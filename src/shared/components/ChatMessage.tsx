{/* 
 * 
 */}
import ChatBubble from '@/shared/components/ChatBubble';
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { AvatarImage } from '@radix-ui/react-avatar';
import { Bot, UserRound } from 'lucide-react';

export type Message = {
    type: "received" | "sent" | "loading",
    text?: string,
};

export default function ChatMessage({type, text}: Message) {
    const onRight = type === "sent";
    let messageClass = "flex space-x-1 items-end ";
    messageClass += onRight ? "self-end" : "self-start";
    const avatarComponent = (
        <Avatar className='h-8 w-8'>
            <AvatarImage src=""/>
            <AvatarFallback>
                {onRight ?
                <UserRound className='text-slate-800'/>
                :
                <Bot className='text-slate-800' />
                }
            </AvatarFallback>
        </Avatar>
    );
    return (
        <div className={messageClass}>
            {!onRight && avatarComponent}
            <ChatBubble type={type} text={text} />
            {onRight && avatarComponent}
        </div>
    );
};