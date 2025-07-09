import { useCallback } from 'react';

import { useThrottled } from '@/shared/lib/hooks/use-throttled';
import { useScaleStore } from '@/shared/model';

export const useScaleWheel = () => {
    const setScale = useScaleStore(state => state.setScale);
    const throttled = useThrottled();

    const handleGlobalWheel = useCallback(
        (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
                throttled(() => {
                    setScale((prevScale: number) => {
                        const newScale =
                            e.deltaY < 0
                                ? Math.min(prevScale + 0.3, 2)
                                : Math.max(prevScale - 0.3, 0.5);
                        return parseFloat(newScale.toFixed(1));
                    });
                }, 10);
            }
        },
        [setScale, throttled]
    );

    return { handleGlobalWheel };
};
