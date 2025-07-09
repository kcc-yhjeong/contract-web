import * as React from 'react';

import { cn } from '@/shared/lib/utils/tailwind-merge';

interface InputProps extends React.ComponentProps<'input'> {
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, onEnter, type = 'text', onChange, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (type === 'number') {
                const value = e.target.value;
                // 숫자 혹은 빈 문자열만 허용 (빈값은 초기화 허용)
                if (/^-?\d*$/.test(value)) {
                    onChange?.(e); // 유효할 때만 전달
                }
            } else {
                onChange?.(e);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                onEnter?.(e);
            }
        };

        return (
            <input
                type={type}
                className={cn(
                    'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    className
                )}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
