import * as React from 'react';
import { useCallback, useState } from 'react';

import { Trash2Icon, UploadIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils/tailwind-merge';

import { Button } from '../base/button';
import { Input } from '../base/input';

interface InputDndFileProps extends Omit<React.ComponentProps<'input'>, 'type' | 'onChange'> {
    onFileSelect?: (file: File) => void;
    onFileDelete?: () => void;
}

const InputDndFile = React.forwardRef<HTMLInputElement, InputDndFileProps>(
    ({ onFileSelect, onFileDelete, className, ...props }, ref) => {
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [isDragging, setIsDragging] = useState(false);

        const handleClick = useCallback(() => {
            (ref as React.RefObject<HTMLInputElement>)?.current?.click();
        }, [ref]);

        const handleFileChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (file) {
                    setSelectedFile(file);
                    onFileSelect?.(file);
                }
            },
            [onFileSelect]
        );

        const handleDragOver = useCallback((event: React.DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDragging(true);
        }, []);

        const handleDragLeave = useCallback((event: React.DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDragging(false);
        }, []);

        const handleDrop = useCallback(
            (event: React.DragEvent) => {
                event.preventDefault();
                event.stopPropagation();
                setIsDragging(false);

                const file = event.dataTransfer.files?.[0];
                if (file) {
                    setSelectedFile(file);
                    onFileSelect?.(file);
                }
            },
            [onFileSelect]
        );

        const handleDelete = useCallback(() => {
            setSelectedFile(null);
            if ((ref as React.RefObject<HTMLInputElement>)?.current) {
                (ref as React.RefObject<HTMLInputElement>).current.value = '';
            }
            onFileDelete?.();
        }, [onFileDelete, ref]);

        return (
            <>
                <Input
                    ref={ref}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    {...props}
                />
                <div
                    className={cn(
                        'border-dashed border-2 border-gray-500 dark:border-gray-300 rounded-md h-60 flex items-center justify-center flex-col gap-4 cursor-pointer hover:border-primary transition-colors',
                        isDragging && 'bg-gray-100 dark:bg-gray-800',
                        className
                    )}
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {selectedFile ? (
                        <div className="flex items-center gap-2">
                            <p className="text-gray-500 dark:text-gray-300">{selectedFile.name}</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                            >
                                <Trash2Icon className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <UploadIcon className="h-10 w-10 text-gray-500 dark:text-gray-300" />
                            <p className="text-gray-500 dark:text-gray-300">
                                파일을 드래그하거나 클릭하여 업로드해 주세요
                            </p>
                        </>
                    )}
                </div>
            </>
        );
    }
);

InputDndFile.displayName = 'InputDndFile';

export { InputDndFile };
export type { InputDndFileProps };
