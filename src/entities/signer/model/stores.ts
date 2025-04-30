import { create } from 'zustand';

import { SignerStore } from './types';

export const useSignerStore = create<SignerStore>(set => ({
    signers: [],
    setSigners: signers => set({ signers }),
    addSigner: signer => set(state => ({ signers: [...state.signers, signer] })),
    updateSigner: (signerId, update) =>
        set(state => ({
            signers: state.signers.map(s => (s.id === signerId ? { ...s, ...update } : s)),
        })),
    removeSigner: signerId =>
        set(state => ({
            signers: state.signers.filter(s => s.id !== signerId),
        })),
}));
