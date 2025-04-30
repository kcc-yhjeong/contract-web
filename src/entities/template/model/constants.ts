export const templateQueryKeys = {
    list: ['template', 'list'] as const,
    detail: (id: string) => ['template', 'detail', id] as const,
};
