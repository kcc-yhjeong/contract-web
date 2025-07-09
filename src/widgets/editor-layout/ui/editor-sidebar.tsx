import { useState } from 'react';

import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

import { Z_INDEX_CLASS } from '@/shared/model';
import { Button } from '@/shared/ui';

export function EditorSidebar({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="relative">
            <Button
                size="icon"
                className={`absolute top-2 right-5 bg-editor-sidebar text-black
                            hover:bg-white ${Z_INDEX_CLASS.LAYOUT} border-[3px] border-[#8b8b8b]`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <aside
                className={`h-full border-none bg-editor-sidebar transition-all duration-300 ${
                    isOpen ? 'w-[300px]' : 'w-0'
                }`}
            >
                <div className="h-full overflow-x-hidden overflow-y-scroll p-3">{children}</div>
            </aside>
        </div>
    );
}
