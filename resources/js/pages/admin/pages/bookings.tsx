import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Eye, Calendar, User, Mail, Phone, Globe, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Bookings', href: '/admin/bookings' },
];

interface Booking {
    id: string;
    destination_id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    travel_date: string;
    group_size: number;
    special_requests?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

interface BookingsProps {
    bookings: Booking[];
}

export default function Bookings({ bookings }: BookingsProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bookings - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookings</h1>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        {bookings.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings yet</h3>
                                <p className="text-gray-500 dark:text-gray-400">Bookings will appear here once customers start making reservations.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="p-4 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                                    <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">Booking #{booking.id}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(booking.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                                                booking.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                                                booking.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                                                'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <User size={14} />
                                                <span>{booking.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Mail size={14} />
                                                <span>{booking.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Phone size={14} />
                                                <span>{booking.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Globe size={14} />
                                                <span>{booking.country}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Calendar size={14} />
                                                <span>{new Date(booking.travel_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Users size={14} />
                                                <span>{booking.group_size} {booking.group_size === 1 ? 'person' : 'people'}</span>
                                            </div>
                                        </div>
                                        
                                        {booking.special_requests && (
                                            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <strong>Special Requests:</strong> {booking.special_requests}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}