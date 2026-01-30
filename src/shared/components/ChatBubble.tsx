{/* 
 * 
 */}
import { Message } from "./ChatMessage";
import Loading from "./Loading";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export default function ChatBubble({type, text}: Message) {
    let bubbleClass = "max-w-7xl rounded-t-xl ";
    if(type == "sent")
        bubbleClass += "bg-slate-200 rounded-l-xl";
    else
        bubbleClass += "bg-blue-200 rounded-r-xl";
    return (
        <div className={bubbleClass}>
            {type === 'loading' ? (
                <Loading />
            ) : (
                <div className="text-left p-4 leading-tight whitespace-pre-wrap">
                    <ReactMarkdown
                        // className="justify-self-center prose prose-sm text-left pb-24 px-8 pt-2 max-w-7xl"
                        remarkPlugins={[remarkGfm]}>
                        {text}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};