import { Download } from 'lucide-react';

import { getFile } from '@/shared/api';
import { isIOS, isKakao } from '@/shared/lib';
import { Button } from '@/shared/ui';

function ContractDownloadFooter({
    contractFileId,
    contractName,
}: {
    contractFileId: string;
    contractName: string;
}) {
    const download = () => {
        //IOS 카카오 인앱브라우저인 경우 PDF 미리보기
        if (isIOS() && isKakao()) {
            const a = document.createElement('a');
            a.href = `${import.meta.env.VITE_CONTRACT_BASE_URL}/file/${contractFileId}`;
            a.download = `${contractName}.pdf`;
            a.click();

            return;
        }

        //그 외 PDF 다운로드
        getFile(contractFileId).then(result => {
            const a = document.createElement('a');
            const pdf = new Blob([result], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(pdf);
            a.href = url;
            a.download = `${contractName}.pdf`;
            a.type = 'application/octet-stream';
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    return (
        <Button size={'lg'} className="text-sm md:text-base" onClick={download}>
            <Download />
            다운로드
        </Button>
    );
}

export { ContractDownloadFooter };
