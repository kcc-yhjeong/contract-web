export interface AttachedFile {
    id: string;
    fileId: string;
    name: string;
    label: string;
    order: number;
    description: string;
    required: boolean;
    url: string;
    signedDate: Date;
}

export interface Signer {
    id: string;
    order: number;
    fieldIds: string[];
    attachedFiles: AttachedFile[];
}

export interface SignerStore {
    signers: Signer[];
    setSigners: (signers: Signer[]) => void;
    addSigner: (signer: Signer) => void;
    updateSigner: (signerId: string, update: Partial<Signer>) => void;
    removeSigner: (signerId: string) => void;
}
