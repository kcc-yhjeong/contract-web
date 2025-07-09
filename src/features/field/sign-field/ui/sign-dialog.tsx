import { useRef } from 'react';

import { Eraser } from 'lucide-react';
import ReactSignatureCanvas from 'react-signature-canvas';

import { SignField } from '@/entities/field';
import { useOverlay } from '@/shared/lib';
import { Alert, Button, Dialog } from '@/shared/ui';

import { useSign } from '../lib/use-sign';

function SignDialogContent({ ref }: { ref: React.RefObject<ReactSignatureCanvas> }) {
    return (
        <div className="flex flex-col gap-2 h-[300px]">
            <ReactSignatureCanvas
                ref={ref}
                minWidth={3}
                clearOnResize={false}
                canvasProps={{
                    style: {
                        border: '2px solid #000',
                        margin: '0 auto',
                        width: '100%',
                        height: '100%',
                    },
                }}
            />
            <div className="text-right">
                <Button variant={'outline'} onClick={() => ref.current?.clear()}>
                    <Eraser />
                    전체 지우기
                </Button>
            </div>
        </div>
    );
}

function SignDialogFooter({ sign, bulkSign }: { sign: () => void; bulkSign: () => void }) {
    return (
        <div className="w-[100%] flex justify-between">
            <Button onClick={bulkSign}>일괄서명하기</Button>
            <Button onClick={sign}>서명하기</Button>
        </div>
    );
}

function SignDialog({ field }: { field: SignField }) {
    const { open, close } = useOverlay();

    const signatureCanvasRef = useRef<ReactSignatureCanvas>(null);

    const { sign, bulkSign } = useSign({
        signerId: field.signerId,
        fieldId: field.id,
        signFileId: field.signFileId ?? '',
    });

    const handleSign = (signCallback: (data: string) => void) => {
        if (signatureCanvasRef.current?.isEmpty()) {
            open(<Alert type="error" title="서명패드에 서명을 그려주세요." />);
            return;
        }

        signCallback(signatureCanvasRef.current?.toDataURL() ?? '');
        close();
    };

    return (
        <Dialog
            title="서명하기"
            content={
                <SignDialogContent
                    ref={signatureCanvasRef as React.RefObject<ReactSignatureCanvas>}
                />
            }
            footer={
                <SignDialogFooter
                    sign={() => handleSign(sign)}
                    bulkSign={() => handleSign(bulkSign)}
                />
            }
        />
    );
}

export { SignDialog };
