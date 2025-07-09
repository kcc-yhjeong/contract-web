import { Signature } from 'lucide-react';

import { Mode, SignField } from '@/entities/field/model/types';
import { useSignerImage } from '@/entities/signer';
import { SignDialog } from '@/features/field/sign-field';
import { useOverlay } from '@/shared/lib';

interface Props {
    field: SignField;
    className: string;
    mode: Mode;
    scale: number;
}

export function RndSignField({ field, className, mode, scale }: Props) {
    const { open } = useOverlay();
    const isSigner = mode === 'sign';
    const isTemplate = mode === 'template';
    const image = useSignerImage({
        signerId: field.signerId,
        imageId: field.imageId ?? field.signFileId ?? '',
    });

    return (
        <>
            <div
                className={`${className} flex items-center justify-center`}
                style={{
                    cursor: isSigner || isTemplate ? 'pointer' : 'default',
                    borderWidth: `${2 * scale}px`,
                }}
                onClick={() => {
                    if (!isSigner) return;
                    open(<SignDialog field={field} />);
                }}
            >
                {image ? (
                    <img src={image} alt="sign" className="w-[100%] h-[100%]" />
                ) : (
                    (isSigner || isTemplate) && (
                        <Signature className="w-[40%] h-[40%]" color="#a3a3ae" />
                    )
                )}
            </div>
        </>
    );
}
