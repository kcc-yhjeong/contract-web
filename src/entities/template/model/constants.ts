export const templateQueryKeys = {
    list: (page?: number, name?: string) => ['template', 'list', { page, name }] as const,
    detail: (id: string) => ['template', 'detail', id] as const,
};
