import { useOverlay } from '@/shared/lib';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shared/ui/base/alert-dialog';
export function Confirm({
    title,
    description,
    onAction,
}: {
    title: string;
    description: string;
    onAction?: () => void;
}) {
    const { close, isOpen } = useOverlay();

    const action = () => {
        onAction?.();
        close();
    };
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={close}>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>확인</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
