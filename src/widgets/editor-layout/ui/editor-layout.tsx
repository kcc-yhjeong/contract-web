import { useEffect, useState } from 'react';

import { PageFieldWrapper } from '@/features/field/get-field';
import { getFile } from '@/shared/api/get-file';
import { useScaleStore } from '@/shared/model';
import { PdfViewer, ScaleWrapper } from '@/shared/ui';

import { EditorFooter } from './editor-footer';
import { EditorHeader } from './editor-header';
import { EditorSidebar } from './editor-sidebar';

export function EditorLayout({
    fileId,
    header,
    sidebar,
    footer,
    onPageClick,
}: {
    fileId: string;
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    footer?: React.ReactNode;
    onPageClick?: ({ page, x, y }: { page: number; x: number; y: number }) => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const setScale = useScaleStore(state => state.setScale);

    useEffect(() => {
        setScale(Math.min(window.outerWidth / 700, 1));
    }, [setScale]);

    useEffect(() => {
        if (fileId) {
            getFile(fileId).then(file => {
                setFile(file);
            });
        }
    }, [fileId]);

    return (
        <div className="flex flex-col" style={{ height: '100dvh' }}>
            <EditorHeader>{header}</EditorHeader>
            <div className="flex flex-1 overflow-hidden relative">
                <main
                    id="editor_layout_content"
                    className="flex-1 overflow-auto bg-editor-main relative"
                >
                    <div className="relative">
                        <ScaleWrapper>
                            <PdfViewer file={file} onPageClick={onPageClick}>
                                {page => <PageFieldWrapper page={page} />}
                            </PdfViewer>
                        </ScaleWrapper>
                    </div>
                </main>
                {sidebar && <EditorSidebar>{sidebar}</EditorSidebar>}
            </div>
            <EditorFooter>{footer}</EditorFooter>
        </div>
    );
}
