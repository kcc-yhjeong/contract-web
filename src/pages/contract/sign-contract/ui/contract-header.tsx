import { Upload } from 'lucide-react';

import { useSignerStore } from '@/entities/signer/model/stores';
import { UploadAttachedFileDialog } from '@/features/signer/attached-file';
import { useOverlay } from '@/shared/lib';
import { Button } from '@/shared/ui';

function ContractHeader({
    contractId,
    signerId,
    name,
}: {
    contractId: string;
    signerId: string;
    name: string;
}) {
    const files = useSignerStore(
        state => state.signers.find(s => s.id === signerId)?.attachedFiles
    );
    const { open } = useOverlay();
    return (
        <div className="flex items-center justify-between w-full px-4 relative">
            <div className="absolute right-1 z-10">
                {files && files.length > 0 && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            open(
                                <UploadAttachedFileDialog
                                    contarctId={contractId}
                                    signerId={signerId}
                                />
                            )
                        }
                        className="bg-white/10 border-white/20 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                    >
                        <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">파일 첨부</span>
                    </Button>
                )}
            </div>
            <div className="flex-1 text-center">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white truncate block max-w-[70%] mx-auto">
                    {name}
                </span>
            </div>
        </div>
    );
}

export { ContractHeader };
