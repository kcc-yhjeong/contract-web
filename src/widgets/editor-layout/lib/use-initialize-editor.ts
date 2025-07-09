import { useContractStore } from '@/entities/contract';
import { Contract } from '@/entities/contract/model/types';
import { Field, SignField, useFieldStore, useFollowinguseFieldStore } from '@/entities/field';
import { useSignerStore } from '@/entities/signer';
import { Template, useTemplateStore } from '@/entities/template';
import { getFileBase64 } from '@/shared/api';

const useInitializeEditor = () => {
    const setTemplate = useTemplateStore(state => state.setTemplate);
    const setContract = useContractStore(state => state.setContract);
    const setSigners = useSignerStore(state => state.setSigners);
    const setFields = useFieldStore(state => state.setFields);
    const clearFollowingField = useFollowinguseFieldStore(state => state.clearFollowingField);

    const initializeTemplate = (template: Template) => {
        const { signer: signers, ...rest } = template;

        const fields: Field[] = signers?.flatMap(signer => signer.fields || []) ?? [];
        setTemplate(rest as Template);
        setSigners(signers ?? []);
        setFields(fields);
        clearFollowingField();
    };

    const initializeContract = (contract: Contract) => {
        const { signer: signers, ...rest } = contract;
        const fields: Field[] = signers?.flatMap(signer => signer.fields || []) ?? [];
        setContract(rest as Contract);
        signers?.forEach(signer => {
            signer.fields?.forEach(field => {
                if ((field as SignField).signFileId) {
                    getFileBase64((field as SignField).signFileId ?? '').then((data: unknown) => {
                        if (!signer.signerImage) signer.signerImage = {};
                        signer.signerImage[(field as SignField).signFileId!] = data as string;
                    });
                }
            });
        });
        setSigners(signers ?? []);
        setFields(fields);
    };

    return { initializeTemplate, initializeContract };
};

export { useInitializeEditor };
