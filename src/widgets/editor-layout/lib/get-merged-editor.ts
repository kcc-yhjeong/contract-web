import { useContractStore } from '@/entities/contract';
import { useFieldStore } from '@/entities/field';
import { useSignerStore } from '@/entities/signer';
import { useTemplateStore } from '@/entities/template';

const getMergedEditor = () => {
    const _template = useTemplateStore.getState().template;
    const _contract = useContractStore.getState().contract;
    const signers = useSignerStore.getState().signers;
    const fields = useFieldStore.getState().fields;

    const mergedSigners = signers.map(signer => ({
        ...signer,
        fields: fields.filter(f => f.signerId === signer.id),
    }));

    return {
        template: { ..._template, signer: mergedSigners },
        contract: { ..._contract, signer: mergedSigners },
    };
};

export { getMergedEditor };
