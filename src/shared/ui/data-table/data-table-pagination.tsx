import * as React from 'react';

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
} from 'lucide-react';

import { Button } from '../base/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../base/pagination';

interface DataTablePaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newIndex: number) => void;
}

export const DataTablePagination = ({
    page,
    totalPages,
    onPageChange,
}: DataTablePaginationProps) => {
    const visiblePages = React.useMemo(() => {
        const pages = [];
        const groupStart = Math.floor(page / 5) * 5;
        const endPage = Math.min(groupStart + 5, totalPages);

        for (let i = groupStart; i < endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [page, totalPages]);

    const handlePreviousGroup = () => {
        const currentGroup = Math.floor(page / 5);
        if (currentGroup > 0) {
            onPageChange((currentGroup - 1) * 5 + 4);
        }
    };

    const handleNextGroup = () => {
        const nextGroupStart = Math.min((Math.floor(page / 5) + 1) * 5, totalPages - 1);
        onPageChange(nextGroupStart);
    };

    return (
        <Pagination>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => onPageChange(0)}
                    disabled={page === 0}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={handlePreviousGroup}
                    disabled={page < 5}
                >
                    <span className="sr-only">Go to previous group</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>

                <PaginationContent>
                    {visiblePages.map(i => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                size="sm"
                                isActive={i === page}
                                onClick={() => onPageChange(i)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </PaginationContent>

                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={handleNextGroup}
                    disabled={page >= Math.floor((totalPages - 1) / 5) * 5}
                >
                    <span className="sr-only">Go to next group</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => onPageChange(totalPages - 1)}
                    disabled={page === totalPages - 1}
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </Pagination>
    );
};
