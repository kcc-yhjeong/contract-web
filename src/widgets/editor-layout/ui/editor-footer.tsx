import { ReactNode } from 'react';

import { Z_INDEX_CLASS } from '@/shared/model';

export function EditorFooter({ children }: { children: ReactNode }) {
    return (
        <footer
            className={`bg-editor-footer ${Z_INDEX_CLASS.LAYOUT} flex min-h-16 items-center justify-center`}
        >
            {children}
        </footer>
    );
}
