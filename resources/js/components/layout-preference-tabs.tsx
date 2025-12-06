import { useLayoutPreference, LayoutMode } from '@/hooks/use-layout-preference';
import { cn } from '@/lib/utils';
import { LucideIcon, Grid3X3, Table } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function LayoutPreferenceTabs({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { layoutMode, updateLayoutMode } = useLayoutPreference();

    const tabs: { value: LayoutMode; icon: LucideIcon; label: string }[] = [
        { value: 'table', icon: Table, label: 'Table' },
        { value: 'grid', icon: Grid3X3, label: 'Grid' },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateLayoutMode(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        layoutMode === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}