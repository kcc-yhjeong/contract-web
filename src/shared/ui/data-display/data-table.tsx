import * as React from 'react';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/data-display/table';

export interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}

const DataTable = <T,>({ columns, data }: DataTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <TableHead key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/shared/ui/navigation/pagination';

interface DataTablePaginationProps {
    pageNumber: number;
    pageCount: number;
    onPageChange: (newIndex: number) => void;
}

const DataTablePagination = ({ pageNumber, pageCount, onPageChange }: DataTablePaginationProps) => {
    const handlePageChange = (newIndex: number) => {
        onPageChange(newIndex);
    };

    const visiblePages = React.useMemo(() => {
        const pages = [];
        const groupStart = Math.floor(pageNumber / 5) * 5;
        const endPage = Math.min(groupStart + 5, pageCount);

        for (let i = groupStart; i < endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [pageNumber, pageCount]);

    const handlePreviousGroup = () => {
        const currentGroup = Math.floor(pageNumber / 5);
        if (currentGroup > 0) {
            handlePageChange((currentGroup - 1) * 5 + 4);
        }
    };

    const handleNextGroup = () => {
        const nextGroupStart = Math.min((Math.floor(pageNumber / 5) + 1) * 5, pageCount - 1);
        handlePageChange(nextGroupStart);
    };

    return (
        <Pagination>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => handlePageChange(0)}
                    disabled={pageNumber === 0}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={handlePreviousGroup}
                    disabled={pageNumber < 5}
                >
                    <span className="sr-only">Go to previous group</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>

                <PaginationContent>
                    {visiblePages.map(i => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={i === pageNumber}
                                onClick={() => handlePageChange(i)}
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
                    disabled={pageNumber >= Math.floor((pageCount - 1) / 5) * 5}
                >
                    <span className="sr-only">Go to next group</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => handlePageChange(pageCount - 1)}
                    disabled={pageNumber === pageCount - 1}
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </Pagination>
    );
};

export { DataTable, DataTablePagination };
