interface TitleProps {
    text: string;
    fontSize?: string;
}

export default function Title({ text, fontSize = "text-xl" }: TitleProps) {
    return (
        <header className="sticky left-0 right-0 top-0 grid grid-cols-3 items-center bg-cover px-2 py-4" style={{backgroundColor:"#000", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, .24)", color:"#fff", padding: ".625rem", zIndex:1}}>
            <div className="justify-self-start flex items-center space-x-2" style={{backgroundImage:"none"}}>
                <img src="/amd_icon.png" alt="AMD Logo"
                    className="h-12 bg-transparent"  // Add bg-transparent here
                    style={{backgroundColor: '#000', display: 'block', objectFit: 'contain',width: 'auto',}}>
                </img>
            </div>

            <p className={`font-bold ${fontSize} text-slate-100 font-roobert text-center`}>
                {text}
            </p>

            <div className="justify-self-end flex flex-col items-end">
                <p className="text-3xl font-bold text-slate-100 font-roobert">MDF Chatbot</p>
                <p className="text-xs font-medium text-slate-100 font-roobert">
                    For AMD Partners
                </p>
            </div>
        </header>
    );
}