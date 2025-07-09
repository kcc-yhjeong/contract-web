import React, { ReactNode } from 'react';

import { useOverlayStore } from '@/shared/model';

export function OverlayProvider({ children }: { children: ReactNode }) {
    const { components } = useOverlayStore();
    return (
        <>
            {components.map((component, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
            ))}
            {children}
        </>
    );
}
