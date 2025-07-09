import { apiInstance } from '@/shared/api/axios-instance';

import { ContractSearchParams } from '../model/types';

export const getContractList = async (params: ContractSearchParams) => {
    const response = await apiInstance.get('/contract', { params });
    return response.data.data;
};
