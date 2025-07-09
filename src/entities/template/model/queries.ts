import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Template, TemplateSearchParams } from '@/entities/template';
import { createTemplate } from '@/entities/template/api/create-template';
import { trashTemplate } from '@/entities/template/api/delete-template';
import { getTemplate } from '@/entities/template/api/get-template';
import { getTemplateList } from '@/entities/template/api/get-template-list';
import { updateTemplate } from '@/entities/template/api/update-template';

import { TEMPLATE_QUERY_KEYS } from './constants';

export const useGetTemplateList = ({ page = 0, name = '' }: Partial<TemplateSearchParams> = {}) => {
    return useQuery({
        queryKey: TEMPLATE_QUERY_KEYS.list(page, name),
        queryFn: () => getTemplateList({ page, name }),
        placeholderData: keepPreviousData,
        enabled: true,
    });
};

export const useGetTemplate = (id: string) => {
    return useQuery({
        queryKey: TEMPLATE_QUERY_KEYS.detail(id),
        queryFn: () => getTemplate(id),
    });
};

export const useCreateTemplate = () => {
    return useMutation<Template, Error, { template: Template; file: File }>({
        mutationFn: ({ template, file }) => createTemplate(template, file),
    });
};

export const useTrashTemplate = (id: string, searchParams: TemplateSearchParams) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => trashTemplate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: TEMPLATE_QUERY_KEYS.list(searchParams.page, searchParams.name),
            });
        },
    });
};

export const useUpdateTemplate = () => {
    return useMutation<Template, Error, { template: Template; file?: File }>({
        mutationFn: ({ template, file }) => updateTemplate(template, file),
    });
};
