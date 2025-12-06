import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import LayoutPreferenceTabs from '@/components/layout-preference-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Theme</h3>
                            <AppearanceTabs />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Default Layout</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Choose your preferred layout for admin pages</p>
                            <LayoutPreferenceTabs />
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
