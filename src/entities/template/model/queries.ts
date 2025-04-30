import { useQuery } from '@tanstack/react-query';

import { getTemplateList } from '@/entities/template/api/get-template-list';

import { templateQueryKeys } from './constants';
import { TemplateSearchParams } from './types';

export const useTemplateList = ({ page, name }: TemplateSearchParams) => {
    return useQuery({
        queryKey: templateQueryKeys.list,
        queryFn: () => getTemplateList({ page, name }),
    });
};
