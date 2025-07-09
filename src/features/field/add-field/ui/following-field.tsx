import { useEffect, useRef } from 'react';

import { FIELD_META } from '@/entities/field';
import { useFollowinguseFieldStore } from '@/entities/field/model/stores';

export function FollowingField() {
    const followingFieldRef = useRef<HTMLDivElement>(null);
    const { type, clearFollowingField } = useFollowinguseFieldStore();

    useEffect(() => {
        if (!type || !followingFieldRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (followingFieldRef.current) {
                followingFieldRef.current.style.left = `${e.clientX + 10}px`;
                followingFieldRef.current.style.top = `${e.clientY + 10}px`;
            }
        };

        const handleMouseRightClick = (e: MouseEvent) => {
            e.preventDefault();
            clearFollowingField();
        };

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            e.preventDefault();
            clearFollowingField();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('contextmenu', handleMouseRightClick);
        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('contextmenu', handleMouseRightClick);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [type, clearFollowingField]);

    if (!type) return null;

    const Icon = FIELD_META[type].icon;

    return (
        <div
            ref={followingFieldRef}
            className="fixed pointer-events-none z-[99999] flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-dashed border-gray-400 bg-white p-[5px]"
        >
            <Icon size={24} className="text-primary" />
        </div>
    );
}
