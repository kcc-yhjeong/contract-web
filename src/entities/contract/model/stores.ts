import { create } from 'zustand';

import { ContractStore } from './types';

export const useContractStore = create<ContractStore>(set => ({
    contract: null,
    setContract: contract => set({ contract }),
}));
