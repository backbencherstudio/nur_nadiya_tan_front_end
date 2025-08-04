
type ButtonProps = {
    title: string;
    className?: string;
    onClick?: () => void;
    icon?: any;
    loading?: boolean;
    sendingMsg?: string
};

export default function ButtonReuseable({ title, className, onClick, icon, loading, sendingMsg }: ButtonProps) {
    return (
        <button
            disabled={loading}
            className={`md:py-3 disabled:bg-grayColor1 disabled:text-white/50 disabled:cursor-not-allowed md:px-4 text-sm md:text-base justify-center flex items-center gap-2 py-2 px-3 rounded-sm cursor-pointer text-white bg-primaryColor hover:scale-105 transition-all shadow-md duration-200 ${className}`}
            onClick={onClick}
        >
            {loading ? sendingMsg : <span className=" flex items-center gap-2">{icon} {title} </span>}
        </button>
    );
}
