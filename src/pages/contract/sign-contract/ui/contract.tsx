import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useGetContract } from '@/entities/contract';
import { FollowingField } from '@/features/field/add-field';
import { EditorLayout, useInitializeEditor } from '@/widgets/editor-layout';

import { ContractDownloadFooter } from './contract-download-footer';
import { ContractHeader } from './contract-header';
import { ContractSignFooter } from './contract-sign-footer';

export function Contract() {
    const { id, signerId } = useParams();
    const navigate = useNavigate();
    const { data: contract } = useGetContract(id ?? '');
    const { initializeContract } = useInitializeEditor();

    useEffect(() => {
        if (contract) {
            initializeContract(contract);

            if (contract.currentOrder === 0) {
                navigate(`/contract/${id}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract]);

    return (
        <>
            <EditorLayout
                fileId={contract?.templateFileId}
                header={
                    <ContractHeader
                        contractId={id ?? ''}
                        signerId={signerId ?? ''}
                        name={contract?.name}
                    />
                }
                // sidebar={<TemplateSidebar />}
                footer={
                    signerId ? (
                        <ContractSignFooter contractId={id ?? ''} signerId={signerId ?? ''} />
                    ) : (
                        <ContractDownloadFooter
                            contractFileId={contract?.contractFileId}
                            contractName={contract?.name}
                        />
                    )
                }
            />
            <FollowingField />
        </>
    );
}
