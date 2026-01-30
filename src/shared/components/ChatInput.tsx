{/* 
 * 
 */}
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import React from "react";

type ChatInputProps = {
    addMessage: (e: React.SyntheticEvent) => void;
    waiting: boolean,
    complete: boolean,
    getReport: (() => void) | null // Make getReport optional or nullable
}

const initialText = "Ask Marketing related anything...";

export default function ChatInput({addMessage, waiting, complete, getReport}: ChatInputProps) {
    
    function handleSubmit(e: React.SyntheticEvent) {
        addMessage(e);
        
        // Reset TextArea
        const target = e.target as typeof e.target & {
            textarea: {value: string};
        };
        target.textarea.value = "";
    }
    
    return (
        <form className="flex w-full items-center p-4 space-x-2" onSubmit={handleSubmit}>
            <Textarea 
                className="bg-slate-200 w-full max-h-28 resize-none"
                name="textarea"
                placeholder={initialText}
                disabled={waiting || complete}
            />
            {complete && getReport ? (
                <Button 
                    type="button"
                    onClick={getReport}
                    disabled={waiting}
                >
                    {waiting ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        "Generate Report"
                    )}
                </Button>
            ) : (
                <Button type="submit" disabled={waiting}>
                    {waiting ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <SendHorizontal />
                    )}
                </Button>
            )}
        </form>
    );
};