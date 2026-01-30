export default function Loading() {
    const dotClass = "w-1.5 h-1.5 rounded-full bg-slate-800 animate-bounce";

    return (
        <div className="flex items-center space-x-1 p-4">
        <div className={dotClass} style={{animationDelay: '0ms'}}></div>
        <div className={dotClass} style={{animationDelay: '150ms'}}></div>
        <div className={dotClass} style={{animationDelay: '300ms'}}></div>
        </div>
    );
};