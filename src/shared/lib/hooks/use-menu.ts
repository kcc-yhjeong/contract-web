import * as React from 'react';

import { useLocation } from 'react-router-dom';

function useIsActiveMenu(path: string) {
    const location = useLocation();

    return React.useMemo(() => {
        return location.pathname === `/${path}`;
    }, [location.pathname, path]);
}

export { useIsActiveMenu };
