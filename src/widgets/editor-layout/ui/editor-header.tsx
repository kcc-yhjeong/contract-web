import { ReactNode } from 'react';

import { Z_INDEX_CLASS } from '@/shared/model';

export function EditorHeader({ children }: { children: ReactNode }) {
    return (
        <header
            className={`min-h-16 bg-editor-header p-5 ${Z_INDEX_CLASS.LAYOUT} relative flex items-center justify-center`}
        >
            {children}
        </header>
    );
}
