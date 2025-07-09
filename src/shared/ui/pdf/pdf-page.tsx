import { memo, useCallback } from 'react';

import { Page } from 'react-pdf';

import { useScaleStore } from '@/shared/model';

function PdfPage({
    page,
    onPageClick,
    children,
    containerRef,
    canvasRef,
    onRenderSuccess,
}: {
    page: number;
    onPageClick?: ({ page, x, y }: { page: number; x: number; y: number }) => void;
    children?: React.ReactNode;
    containerRef?: (el: HTMLDivElement | null) => void;
    canvasRef?: (el: HTMLCanvasElement | null) => void;
    onRenderSuccess?: (page: { _pageIndex: number; width: number; height: number }) => void;
}) {
    const scale = useScaleStore(state => state.scale);

    const handlePageClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, page: number) => {
            if (!onPageClick) return;
            const x = e.nativeEvent.offsetX / scale;
            const y = e.nativeEvent.offsetY / scale;

            onPageClick({ page, x, y });
        },
        [onPageClick, scale]
    );

    return (
        <>
            <div ref={containerRef} className={`relative mb-4 mx-auto`}>
                <div>
                    {children}
                    <Page
                        onClick={e => handlePageClick(e, page)}
                        pageNumber={page}
                        devicePixelRatio={2}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        onRenderSuccess={onRenderSuccess}
                        canvasRef={canvasRef}
                    ></Page>
                </div>
            </div>
        </>
    );
}

export default memo(PdfPage, (prevProps, nextProps) => {
    return prevProps.page === nextProps.page;
});
