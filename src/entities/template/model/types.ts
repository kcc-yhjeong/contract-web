import { Signer } from '@/entities/signer';

export interface Template {
    id?: string;
    name?: string;
    templateFileId?: string;
    formattedCreatedDate?: string;
    formattedLastModifiedDate?: string;
    file?: File;
    signer?: Signer[];
    signerImage?: Record<string, string>; //임시, 지울예정
}

export interface TemplateStore {
    template: Template | null;
    setTemplate: (template: Template | null | ((prev: Template | null) => Template | null)) => void;
}

export interface TemplateSearchParams {
    page: number;
    name: string;
}
