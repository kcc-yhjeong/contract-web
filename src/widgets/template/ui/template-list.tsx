import React, { useMemo, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { MoreVerticalIcon } from 'lucide-react';

import { useTemplateList } from '@/entities/template/model/queries';
import { TemplateSearchParams } from '@/entities/template/model/types';
import { Button } from '@/shared/ui/button';
import { DataTable, DataTablePagination } from '@/shared/ui/data-display';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown/dropdown-menu';

interface TemplateItem {
    id: string;
    name: string;
    status: string;
    version: number;
    formattedCreatedDate: string;
    formattedLastModifiedDate: string;
}

export function TemplateList() {
    const [searchParams, setSearchParams] = useState<TemplateSearchParams>({
        page: 0,
        name: '',
    });

    const { data, refetch } = useTemplateList(searchParams);

    const handleSearch = () => {
        refetch();
    };

    const columns = useMemo<ColumnDef<TemplateItem>[]>(
        () => [
            {
                accessorKey: 'name',
                header: '템플릿명',
            },
            {
                accessorKey: 'createdBy',
                header: '작성자',
            },
            {
                accessorKey: 'formattedCreatedDate',
                header: '생성일',
            },
            {
                accessorKey: 'formattedLastModifiedDate',
                header: '수정일',
            },
            {
                accessorKey: 'id',
                header: '',
                cell: () => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                                size="icon"
                            >
                                <MoreVerticalIcon />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Make a copy</DropdownMenuItem>
                            <DropdownMenuItem>Favorite</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        []
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="템플릿명 검색"
                    value={searchParams.name}
                    onChange={e => setSearchParams(prev => ({ ...prev, name: e.target.value }))}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    className="h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button onClick={handleSearch}>검색</Button>
            </div>
            <div className="w-full overflow-x-auto">
                <DataTable columns={columns} data={data?.content ?? []} />
            </div>
            <DataTablePagination
                pageNumber={data?.page?.number ?? 0}
                pageCount={data?.page?.totalPages ?? 0}
                onPageChange={page => setSearchParams(prev => ({ ...prev, page }))}
            />
        </div>
    );
}
