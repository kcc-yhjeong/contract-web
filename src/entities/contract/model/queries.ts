import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import { Signer } from '@/entities/signer';

import { addAttachedFile } from '../api/add-attached-file';
import { deleteAttachedFile } from '../api/delete-attached-file';
import { getContract } from '../api/get-contract';
import { getContractList } from '../api/get-contract-list';
import { signContract } from '../api/sign-contract';
import { CONTRACT_QUERY_KEYS } from './constants';
import { Contract, ContractSearchParams } from './types';

export const useGetContractList = ({ page = 0, name = '' }: Partial<ContractSearchParams> = {}) => {
    return useQuery({
        queryKey: CONTRACT_QUERY_KEYS.list(page, name),
        queryFn: () => getContractList({ page, name }),
        placeholderData: keepPreviousData,
        enabled: false,
    });
};

export const useGetContract = (id: string) => {
    return useQuery({
        queryKey: CONTRACT_QUERY_KEYS.detail(id),
        queryFn: () => getContract(id),
    });
};

export const useSignContract = () => {
    return useMutation<Contract, Error, { contractId: string; signer: Signer }>({
        mutationFn: ({ contractId, signer }) => signContract({ contractId, signer }),
    });
};

export const useAddAttachedFile = () => {
    return useMutation<
        string,
        Error,
        { contractId: string; signerId: string; fileId: string; file: File }
    >({
        mutationFn: ({ contractId, signerId, fileId, file }) =>
            addAttachedFile({ contractId, signerId, fileId, file }),
    });
};

export const useDeleteAttachedFile = () => {
    return useMutation<void, Error, { contractId: string; signerId: string; fileId: string }>({
        mutationFn: ({ contractId, signerId, fileId }) =>
            deleteAttachedFile({ contractId, signerId, fileId }),
    });
};
