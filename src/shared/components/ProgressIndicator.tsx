{/* 
 * 
 */}
import { Progress } from "@/shared/components/ui/progress";

interface ProgressIndicatorProps {
    completed: number
    total: number
    label?: string
};

export default function ProgressIndicator({
    completed,
    total,
    label
}: ProgressIndicatorProps) {
    const percentage = Math.round((completed / total) * 100)
    return (
        <div className="absolute top-4 right-4 w-64 rounded-lg shadow-md border p-2 z-10 bg-white">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-black">
                    {completed}/{total} {label}
                </h3>
                <span className="text-sm font-medium text-black">{percentage}%</span>
            </div>
            <Progress
                value={percentage}
                className="h-2"
                aria-label={`${completed} of ${total} ${label}`}
            />
        </div>
    );
};