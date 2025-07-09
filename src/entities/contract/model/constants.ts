export const CONTRACT_QUERY_KEYS = {
    list: (page: number, name: string) => ['contract', 'list', page, name] as const,
    detail: (id: string) => ['contract', 'detail', id] as const,
};
