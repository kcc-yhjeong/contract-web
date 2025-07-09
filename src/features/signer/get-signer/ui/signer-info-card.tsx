import { memo } from 'react';

import { INDEX_TO_KR, MAX_SIGNER_COUNT } from '@/entities/signer';

function SignerInfoCard({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signerId,
    index,
    action,
    children,
}: {
    signerId: string;
    index: number;
    action?: React.ReactNode;
    children: React.ReactNode;
}) {
    if (index > MAX_SIGNER_COUNT) return <></>;
    return (
        <div
            className={`mt-3 rounded-lg border bg-white p-4 shadow-md w-[100%] border-t-[3px] border-t-signer-${index}`}
        >
            <div className="flex items-center justify-between border-b pb-1 mb-2">
                <span className="font-medium">
                    {INDEX_TO_KR[index as keyof typeof INDEX_TO_KR]} 서명자
                </span>
                <div>{action}</div>
            </div>
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    );
}

export default memo(
    SignerInfoCard,
    (prev, next) => prev.signerId === next.signerId && prev.index === next.index
);
