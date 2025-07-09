import { useCallback, useRef } from 'react';

export const useThrottled = () => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useCallback((callback: () => void, delay: number) => {
        if (timeoutRef.current) return;

        timeoutRef.current = setTimeout(() => {
            callback();
            timeoutRef.current = null;
        }, delay);
    }, []);
};
