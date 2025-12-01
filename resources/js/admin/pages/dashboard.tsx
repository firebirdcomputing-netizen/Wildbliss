import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import StatsCards from '../components/stats-cards';
import RecentBookings from '../components/recent-bookings';
import TourManagement from '../components/tour-management';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        totalBookings: number;
        totalDestinations: number;
        totalCustomers: number;
        pendingBookings: number;
    };
    recentBookings: any[];
    popularDestinations: any[];
}

export default function Dashboard({
    stats,
    recentBookings,
    popularDestinations,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard - WildBliss Tours" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                </div>

                <StatsCards stats={stats} />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <RecentBookings bookings={recentBookings} />
                    <TourManagement destinations={popularDestinations} />
                </div>
            </div>
        </AppLayout>
    );
}
