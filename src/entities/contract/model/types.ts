import { Template } from '@/entities/template/model/types';

export interface Contract extends Template {
    templateId?: string;
    contractFileId?: string;
    expiredDate?: string;
    url?: string;
    signerImage?: Record<string, string>;
}

export interface ContractStore {
    contract: Contract | null;
    setContract: (contract: Contract) => void;
}

export interface ContractSearchParams {
    page: number;
    name: string;
}
