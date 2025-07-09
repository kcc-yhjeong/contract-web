import { useEffect, useRef, useState } from 'react';

import { Document, pdfjs } from 'react-pdf';

import { useLoading } from '@/shared/lib';
import { useScaleStore } from '@/shared/model';

import PdfPage from './pdf-page';
import { PdfPageSkeleton } from './pdf-page-skeleton';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './pdfWorkerPolifill.js';

export function PdfViewer({
    file,
    children,
    onPageClick,
}: {
    file: File | null;
    children: (page: number) => React.ReactNode;
    onPageClick?: ({ page, x, y }: { page: number; x: number; y: number }) => void;
}) {
    const { scale } = useScaleStore();
    const [pages, setPages] = useState(0);
    const [loadPages, setLoadPages] = useState(0);
    const { isLoading, start, stop } = useLoading();

    const containerRefs = useRef<Array<HTMLDivElement | null>>([]);
    const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
    const canvasDimensions = useRef<Array<{ width: number; height: number }>>([]);

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString();

        start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onLoadSuccess = ({ numPages }: { numPages: number }) => {
        setPages(numPages);
    };

    const onRenderSuccess = (page: { _pageIndex: number; width: number; height: number }) => {
        canvasDimensions.current[page._pageIndex] = {
            width: page.width,
            height: page.height,
        };
        setLoadPages(prev => (prev === pages ? 1 : prev + 1));

        // 초기 크기 설정
        const container = containerRefs.current[page._pageIndex];
        if (container) {
            container.style.width = `${page.width}px`;
        }
    };

    // scale 변경 시 pdf 페이지 크기 조정 및 스크롤 위치 조정
    useEffect(() => {
        const mainElement = document.getElementById('editor_layout_content') as HTMLElement;

        if (!mainElement || canvasRefs.current.length !== loadPages || loadPages === 0) return;

        // 기존 스크롤 위치 및 크기
        const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } =
            mainElement;

        // 스크롤 퍼센트 계산
        const scrollTopPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        const scrollLeftPercent = (scrollLeft / (scrollWidth - clientWidth)) * 100;

        // pdf 페이지 크기 업데이트
        canvasRefs.current.forEach((canvas, index) => {
            const { width: initialWidth, height: initialHeight } =
                canvasDimensions.current[index] || {};

            if (initialWidth && initialHeight && canvas) {
                const newWidth = initialWidth * scale;
                const newHeight = initialHeight * scale;

                // 스타일 업데이트
                const container = containerRefs.current[index];
                if (container) {
                    container.style.width = `${newWidth}px`;
                }
                canvas.style.width = `${newWidth}px`;
                canvas.style.height = `${newHeight}px`;
            }
        });

        // 새로운 스크롤 위치 계산
        const newScrollHeight = mainElement.scrollHeight;
        const newScrollWidth = mainElement.scrollWidth;

        const newScrollTop = (scrollTopPercent / 100) * (newScrollHeight - clientHeight);
        const newScrollLeft = (scrollLeftPercent / 100) * (newScrollWidth - clientWidth);

        // 새로운 스크롤 위치 설정
        mainElement.scrollTop = newScrollTop;
        mainElement.scrollLeft = newScrollLeft;
    }, [loadPages, scale]);

    useEffect(() => {
        if (canvasRefs.current.length === loadPages && loadPages !== 0) {
            setTimeout(() => {
                stop();
            }, 500);
        }
    }, [loadPages, stop]);

    if (!file) return null;

    return (
        <div className="mt-8 mx-auto relative">
            <Document onLoadSuccess={onLoadSuccess} file={file} loading={<></>}>
                {Array.from(new Array(pages), (el, index) => {
                    const page = index + 1;
                    return (
                        <div key={`page_${page}`} className="relative">
                            <div className={isLoading ? 'opacity-0' : 'opacity-100'}>
                                <PdfPage
                                    page={page}
                                    onPageClick={onPageClick}
                                    containerRef={el => (containerRefs.current[index] = el)}
                                    canvasRef={el => (canvasRefs.current[index] = el)}
                                    onRenderSuccess={onRenderSuccess}
                                >
                                    {children(page)}
                                </PdfPage>
                            </div>
                            {isLoading && (
                                <div className="absolute inset-0">
                                    <PdfPageSkeleton />
                                </div>
                            )}
                        </div>
                    );
                })}
            </Document>
        </div>
    );
}
