import { useState, useEffect } from "react";

const useLoading = (initialLoading: boolean = true, delay: number = 1000) => {
    const [loading, setLoading] = useState<boolean>(initialLoading);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return loading;
};

export default useLoading;
