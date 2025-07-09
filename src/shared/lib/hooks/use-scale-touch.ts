import { useCallback, useRef } from 'react';

import { useThrottled } from '@/shared/lib/hooks/use-throttled';
import { useScaleStore } from '@/shared/model';

export const useScaleTouch = () => {
    const setScale = useScaleStore(state => state.setScale);
    const lastDistance = useRef(0);
    const throttled = useThrottled();

    // 터치 시작 핸들러
    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (e.touches.length === 2) {
            lastDistance.current = getDistance(e.touches[0], e.touches[1]);
        }
    }, []);

    // 터치 이동 핸들러
    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (e.touches.length === 2) {
                e.preventDefault();

                const distance = getDistance(e.touches[0], e.touches[1]);
                const delta = distance - lastDistance.current;

                throttled(() => {
                    setScale((prevScale: number) => {
                        const newScale = prevScale + delta * 0.005;
                        return parseFloat(Math.min(Math.max(newScale, 0.4), 3).toFixed(1));
                    });
                }, 10);

                lastDistance.current = distance;
            }
        },
        [setScale, throttled]
    );

    const handleTouchEnd = () => {
        lastDistance.current = 0;
    };

    // 두 손가락 간 거리 계산 함수
    const getDistance = (touch1: Touch, touch2: Touch) => {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
