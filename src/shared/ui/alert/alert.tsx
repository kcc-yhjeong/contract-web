import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

import { useOverlay } from '@/shared/lib';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shared/ui/base/alert-dialog';

type AlertType = 'warning' | 'error' | 'success' | 'info';

interface AlertProps {
    type?: AlertType;
    title: string;
    description?: string;
    onAction?: () => void;
}

const ALERT_CONFIG: Record<AlertType, { icon: React.ReactNode; color: string }> = {
    error: {
        icon: <AlertCircle className="w-[50px] h-[50px] text-red-500" />,
        color: 'text-red-500',
    },
    warning: {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        color: 'text-yellow-500',
    },
    success: {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        color: 'text-green-500',
    },
    info: {
        icon: <Info className="w-5 h-5 text-blue-500" />,
        color: 'text-blue-500',
    },
};

export function Alert({ type = 'info', title, description, onAction }: AlertProps) {
    const { isOpen, close } = useOverlay();
    const config = ALERT_CONFIG[type];

    const handleClose = () => {
        close();
        onAction?.();
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-center items-center gap-2">{config.icon}</div>
                    <AlertDialogTitle className="text-center font-medium">{title}</AlertDialogTitle>
                    {description && (
                        <AlertDialogDescription className="text-center">
                            {description}
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="mt-2 w-full" onClick={handleClose}>
                        확인
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
