export const TEMPLATE_QUERY_KEYS = {
    list: (page: number, name?: string | null) => ['template', 'list', page, name ?? ''] as const,
    detail: (id: string) => ['template', 'detail', id] as const,
};
