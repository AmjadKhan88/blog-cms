
const Loader = ()=> {
    return (
        <div className="flex items-center justify-center min-h-[200px] gap-2">
            <span className="w-3 h-3 bg-[#b3552e] rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-[#b3552e] rounded-full animate-pulse delay-150"></span>
            <span className="w-3 h-3 bg-[#b3552e] rounded-full animate-pulse delay-300"></span>
        </div>
    )
}
export default Loader;