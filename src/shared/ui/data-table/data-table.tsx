import * as React from 'react';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { useBreakpoint } from '@/shared/lib/hooks/use-breakpoint';

import { Skeleton } from '../base/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../base/table';
import { DataTablePagination } from './data-table-pagination';

export interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    page?: number;
    totalPages?: number;
    onPageChange?: (newIndex: number) => void;
    isLoading?: boolean;
}

const DataTable = <T,>({
    columns,
    data,
    page,
    totalPages,
    onPageChange,
    isLoading,
}: DataTableProps<T>) => {
    const breakpoint = useBreakpoint();

    const columnVisibility = React.useMemo(() => {
        const visibility: VisibilityState = {};
        const breakpointOrder = ['sm', 'md', 'lg', 'xl', '2xl'];
        const currentBreakpointIndex = breakpointOrder.indexOf(breakpoint);

        columns.forEach(column => {
            const meta = column.meta as { breakpoint?: string } | undefined;
            if (!('accessorKey' in column)) return;

            if (meta?.breakpoint) {
                const columnBreakpointIndex = breakpointOrder.indexOf(meta.breakpoint);
                visibility[column.accessorKey as string] =
                    currentBreakpointIndex >= columnBreakpointIndex;
            } else {
                visibility[column.accessorKey as string] = true;
            }
        });
        return visibility;
    }, [columns, breakpoint]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnVisibility,
        },
    });

    return (
        <>
            <Table>
                <TableHeader className="sticky top-0 z-10 bg-muted">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{ width: header.getSize() }}
                                >
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
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={`skeleton-${index}`}>
                                {table.getHeaderGroups()[0].headers.map(header => (
                                    <TableCell
                                        key={`skeleton-cell-${header.id}`}
                                        style={{ width: header.getSize() }}
                                        className="h-20"
                                    >
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : table.getRowModel().rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-[400px] text-center">
                                검색 결과가 없습니다.
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} className="h-20">
                                {row.getVisibleCells().map(cell => (
                                    <TableCell
                                        key={cell.id}
                                        style={{ width: cell.column.getSize() }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {page !== undefined && totalPages !== undefined && onPageChange && totalPages !== 0 && (
                <DataTablePagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </>
    );
};

export { DataTable };
