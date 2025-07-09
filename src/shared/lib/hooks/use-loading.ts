import { useCallback } from 'react';

import { useLoadingStore } from '@/shared/model/stores/use-loading-store';

export const useLoading = () => {
    const isLoading = useLoadingStore(state => state.loading);
    const setLoading = useLoadingStore(state => state.setLoading);
    const start = useLoadingStore(state => state.start);
    const stop = useLoadingStore(state => state.stop);

    const startLoading = useCallback(() => start(), [start]);
    const stopLoading = useCallback(() => stop(), [stop]);

    return { isLoading, setLoading, start: startLoading, stop: stopLoading };
};
