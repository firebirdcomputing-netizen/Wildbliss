import { useEffect, useState } from 'react';

export type LayoutMode = 'table' | 'grid';

export function useLayoutPreference() {
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('table');

    useEffect(() => {
        const stored = localStorage.getItem('layout-preference');
        if (stored && (stored === 'table' || stored === 'grid')) {
            setLayoutMode(stored as LayoutMode);
        }
    }, []);

    const updateLayoutMode = (mode: LayoutMode) => {
        setLayoutMode(mode);
        localStorage.setItem('layout-preference', mode);
    };

    return { layoutMode, updateLayoutMode };
}