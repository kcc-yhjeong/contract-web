import { Field } from '@/entities/field';

export interface AttachedFile {
    id: string;
    fileId?: string;
    name?: string;
    label: string;
    order?: number;
    description?: string;
    required: boolean;
}

export interface Signer {
    id: string;
    order: number;
    name?: string;
    contact?: string;
    url?: string;
    signedDate?: Date;
    fields?: Field[];
    attachedFiles?: AttachedFile[];
    signerImage?: Record<string, string>;
}

export interface SignerStore {
    signers: Signer[];
    setSigners: (signers: Signer[]) => void;
    addSigner: () => void;
    deleteSigner: (signerId: string) => void;
    addSignerImage: ({
        signerId,
        imageId,
        data,
    }: {
        signerId: string;
        imageId: string;
        data: string;
    }) => void;
    deleteSignerImage: ({
        imageId,
        ignoreImageId,
    }: {
        signerId: string;
        imageId?: string;
        ignoreImageId?: string;
    }) => void;
    updateAttachment: ({
        signerId,
        attachmentId,
        fileId,
        name,
    }: {
        signerId: string;
        attachmentId: string;
        fileId?: string;
        name?: string;
    }) => void;
}
