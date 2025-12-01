import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Eye, User, Mail, Phone, Globe, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Customers', href: '/admin/customers' },
];

interface Customer {
    name: string;
    email: string;
    phone: string;
    country: string;
    bookings_count: number;
    first_booking: string;
}

interface CustomersProps {
    customers: Customer[];
}

export default function Customers({ customers }: CustomersProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        {customers.length === 0 ? (
                            <div className="text-center py-12">
                                <User size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No customers yet</h3>
                                <p className="text-gray-500 dark:text-gray-400">Customers will appear here once bookings are made.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {customers.map((customer, index) => (
                                    <div key={`${customer.email}-${index}`} className="p-4 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                                    <User size={20} className="text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Customer since {new Date(customer.first_booking).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900 dark:text-white">{customer.bookings_count} {customer.bookings_count === 1 ? 'Booking' : 'Bookings'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Mail size={14} />
                                                <span>{customer.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Phone size={14} />
                                                <span>{customer.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Globe size={14} />
                                                <span>{customer.country}</span>
                                            </div>
                                        </div>
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