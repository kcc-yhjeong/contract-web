import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { useFieldStore } from '@/entities/field';

import { SignerStore } from './types';

export const useSignerStore = create<SignerStore>(set => ({
    signers: [],
    setSigners: signers =>
        set({
            signers: !signers || signers.length === 0 ? [{ id: uuidv4(), order: 1 }] : signers,
        }),
    addSigner: () =>
        set(state => ({
            signers: [...state.signers, { id: uuidv4(), order: state.signers.length + 1 }],
        })),
    deleteSigner: signerId => {
        const deleteFields = useFieldStore.getState().deleteFieldsBySigner;
        deleteFields(signerId);
        set(state => ({
            signers:
                state.signers.filter(signer => signer.id !== signerId).length === 0
                    ? [{ id: uuidv4(), order: 1 }]
                    : state.signers
                          .filter(signer => signer.id !== signerId)
                          .map((signer, index) => ({
                              ...signer,
                              order: index + 1,
                          })),
        }));
    },
    addSignerImage: ({
        signerId,
        imageId,
        data,
    }: {
        signerId: string;
        imageId: string;
        data: string;
    }) =>
        set(state => ({
            signers: state.signers.map(signer =>
                signer.id === signerId
                    ? {
                          ...signer,
                          signerImage: { ...signer.signerImage, [imageId]: data },
                      }
                    : signer
            ),
        })),
    deleteSignerImage: ({
        signerId,
        imageId,
        ignoreImageId,
    }: {
        signerId: string;
        imageId?: string | null;
        ignoreImageId?: string;
    }) =>
        set(state => ({
            signers: state.signers.map(signer =>
                signer.id === signerId
                    ? {
                          ...signer,
                          signerImage: Object.fromEntries(
                              Object.entries(signer.signerImage ?? {}).filter(
                                  ([key]) =>
                                      (imageId ? key !== imageId : true) &&
                                      (ignoreImageId ? key === ignoreImageId : true)
                              )
                          ),
                      }
                    : signer
            ),
        })),
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
    }) =>
        set(state => ({
            signers: state.signers.map(signer =>
                signer.id === signerId
                    ? {
                          ...signer,
                          attachedFiles:
                              signer.attachedFiles?.map(attachedFile =>
                                  attachedFile.id === attachmentId
                                      ? {
                                            ...attachedFile,
                                            fileId,
                                            name,
                                        }
                                      : attachedFile
                              ) || [],
                      }
                    : signer
            ),
        })),
}));

export const useSignerOrder = (signerId: string) => {
    return useSignerStore(state => state.signers.find(signer => signer.id === signerId)?.order);
};

export const useSignerImage = ({ signerId, imageId }: { signerId: string; imageId: string }) => {
    return useSignerStore(
        useShallow(
            state => state.signers.find(signer => signer.id === signerId)?.signerImage?.[imageId]
        )
    );
};
