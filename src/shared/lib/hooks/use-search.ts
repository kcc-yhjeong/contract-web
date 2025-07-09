import { useCallback, useEffect, useState } from 'react';

import { UseQueryResult } from '@tanstack/react-query';

export const useSearch = <T extends object, R = unknown>(
    queryHook: (params: T) => UseQueryResult<R>
) => {
    const [filters, setFilters] = useState<T>({ page: 0 } as T);
    const queryResult = queryHook(filters);

    useEffect(() => {
        queryResult.refetch();
    }, [filters]);

    const setPage = useCallback(
        (page: number) => {
            setFilters(prev => ({ ...prev, page }));
        },
        [setFilters]
    );

    const search = useCallback(
        (newFilters: T) => {
            setFilters(() => ({ ...newFilters, page: 0 }) as T);
        },
        [setFilters]
    );

    return {
        ...queryResult,
        filters,
        page: (filters as { page?: number }).page ?? 0,
        setPage,
        search,
    };
};
