import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

export const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= breakpoints['2xl']) {
                setBreakpoint('2xl');
            } else if (width >= breakpoints.xl) {
                setBreakpoint('xl');
            } else if (width >= breakpoints.lg) {
                setBreakpoint('lg');
            } else if (width >= breakpoints.md) {
                setBreakpoint('md');
            } else {
                setBreakpoint('sm');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
};
