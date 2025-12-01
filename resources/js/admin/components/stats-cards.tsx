import { Users, Calendar, MapPin, Clock } from 'lucide-react';

interface StatsCardsProps {
    stats: {
        totalBookings: number;
        totalDestinations: number;
        totalCustomers: number;
        pendingBookings: number;
    };
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const statsData = [
        {
            title: 'Total Bookings',
            value: stats.totalBookings.toString(),
            icon: Calendar,
            color: 'text-blue-600'
        },
        {
            title: 'Destinations',
            value: stats.totalDestinations.toString(),
            icon: MapPin,
            color: 'text-green-600'
        },
        {
            title: 'Total Customers',
            value: stats.totalCustomers.toString(),
            icon: Users,
            color: 'text-purple-600'
        },
        {
            title: 'Pending Bookings',
            value: stats.pendingBookings.toString(),
            icon: Clock,
            color: 'text-orange-600'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>

                        </div>
                        <div className={`p-3 rounded-full bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}