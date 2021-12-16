import { useState } from "react";

export const useBoolFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback()
        } catch(e) {
            console.log(e);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }
    
    return [fetching, isLoading, isError];
}