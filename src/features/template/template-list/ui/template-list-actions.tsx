import { useEffect } from 'react';

import { MoreVerticalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { TemplateSearchParams, useTrashTemplate } from '@/entities/template';
import { useOverlay } from '@/shared/lib';
import {
    Button,
    Confirm,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui';

export function TemplateListActions({
    id,
    filters,
}: {
    id: string;
    filters: TemplateSearchParams;
}) {
    const navigate = useNavigate();
    const { open, close } = useOverlay();
    const { mutate: trashTemplate, isSuccess } = useTrashTemplate(id, filters);

    const handleDelete = () => {
        open(
            <Confirm
                title="템플릿 삭제"
                description="삭제한 템플릿은 휴지통에서 복구할 수 있습니다. 삭제하시겠습니까?"
                onAction={() => {
                    trashTemplate();
                }}
            />
        );
    };

    useEffect(() => {
        if (isSuccess) {
            close();
        }
    }, [isSuccess, close]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                >
                    <MoreVerticalIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate(`/template/edit/${id}`)}
                >
                    템플릿 수정
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
                    템플릿 삭제
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
