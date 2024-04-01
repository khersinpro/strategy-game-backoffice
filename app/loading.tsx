
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex space-x-2 animate-pulse">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        </div>
        </div>
    )
}