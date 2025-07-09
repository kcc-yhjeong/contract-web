import React, { useMemo } from 'react';

import { ColumnDef } from '@tanstack/react-table';

import { Template, TemplateSearchParams } from '@/entities/template';
import { useGetTemplateList } from '@/entities/template';
import { useSearch } from '@/shared/lib';
import { DataTable } from '@/shared/ui';

import { TemplateListActions } from './template-list-actions';
import { TemplateListCondition } from './template-list-condition';

export function TemplateList() {
    const { page, setPage, search, data, isFetching, filters } = useSearch(useGetTemplateList);
    const columns = useMemo<ColumnDef<Template>[]>(
        () => [
            {
                accessorKey: 'name',
                header: '템플릿명',
                size: 400,
            },
            {
                accessorKey: 'createdBy',
                header: '작성자',
                size: 100,
                meta: {
                    breakpoint: 'md',
                },
            },
            {
                accessorKey: 'formattedCreatedDate',
                header: '생성일',
                size: 150,
                meta: {
                    breakpoint: 'lg',
                },
            },
            {
                accessorKey: 'formattedLastModifiedDate',
                header: '수정일',
                size: 150,
                meta: {
                    breakpoint: 'lg',
                },
            },
            {
                accessorKey: 'id',
                header: '',
                cell: ({ row }) => (
                    <TemplateListActions
                        id={row.original.id ?? ''}
                        filters={filters as TemplateSearchParams}
                    />
                ),
                size: 50,
            },
        ],
        [filters]
    );
    return (
        <>
            <div className="aflex justify-end">
                <TemplateListCondition search={search} />
            </div>
            <DataTable
                columns={columns}
                data={data?.content ?? []}
                page={page}
                totalPages={data?.page?.totalPages ?? 0}
                onPageChange={setPage}
                isLoading={isFetching}
            />
        </>
    );
}
