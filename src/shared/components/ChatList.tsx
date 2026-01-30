{/* 
 * 
 */}
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useEffect, useRef } from "react";

type ChatListProps = {
    children: React.ReactNode,
}
export default function ChatList({children}: ChatListProps) {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [children]);

    return (
        <ScrollArea className="w-full h-full">
            <div className="flex flex-col space-y-4 m-2">
                {children}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    );
};