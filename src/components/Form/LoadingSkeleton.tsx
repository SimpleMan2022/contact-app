import {Skeleton} from "@/components/ui/skeleton.tsx";

const LoadingSkeleton:React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <Skeleton className="w-40 h-40 rounded-full mb-3"/>
            <Skeleton className="h-12 w-full mb-3"/>
            <Skeleton className="h-52 w-full mb-3"/>
            <Skeleton className="h-6 w-full mb-3"/>
            <Skeleton className="h-10 w-full"/>
        </div>
    )
}

export default LoadingSkeleton;