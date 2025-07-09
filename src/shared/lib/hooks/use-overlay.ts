import { useOverlayStore } from '@/shared/model';

export function useOverlay() {
    const open = useOverlayStore(state => state.open);
    const close = useOverlayStore(state => state.close);
    const isOpen = useOverlayStore(state => state.components.length > 0);
    return { open, close, isOpen };
}
