import { useEffect } from 'react';

import { Helmet } from 'react-helmet';

import { useScaleTouch, useScaleWheel } from '@/shared/lib';

interface ScaleWrapperProps {
    children: React.ReactNode;
}

export function ScaleWrapper({ children }: ScaleWrapperProps) {
    const { handleGlobalWheel } = useScaleWheel();
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useScaleTouch();

    useEffect(() => {
        window.addEventListener('wheel', handleGlobalWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleGlobalWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleGlobalWheel, handleTouchMove, handleTouchStart, handleTouchEnd]);

    return (
        <>
            <Helmet>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Helmet>
            <div>{children}</div>
        </>
    );
}
