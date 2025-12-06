import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Eye, User, Mail, Phone, Globe, Calendar, Grid3X3, Table } from 'lucide-react';
import { useState } from 'react';
import CustomerDetailsDialog from '@/admin/dialogs/customer-details-dialog';
import { useLayoutPreference } from '@/hooks/use-layout-preference';

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
    const { layoutMode, updateLayoutMode } = useLayoutPreference();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const handleViewDetails = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowDetailsDialog(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={layoutMode === 'grid' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateLayoutMode('grid')}
                        >
                            <Grid3X3 size={16} />
                        </Button>
                        <Button
                            variant={layoutMode === 'table' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateLayoutMode('table')}
                        >
                            <Table size={16} />
                        </Button>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        {customers.length === 0 ? (
                            <div className="text-center py-12">
                                <User size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No customers yet</h3>
                                <p className="text-gray-500 dark:text-gray-400">Customers will appear here once bookings are made.</p>
                            </div>
                        ) : layoutMode === 'table' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Customer</th>
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Phone</th>
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Country</th>
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Bookings</th>
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Since</th>
                                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((customer, index) => (
                                            <tr 
                                                key={`${customer.email}-${index}`} 
                                                className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                                onClick={() => handleViewDetails(customer)}
                                            >
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                                            <User size={16} className="text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <span className="font-medium text-gray-900 dark:text-white">{customer.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{customer.email}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{customer.phone}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{customer.country}</td>
                                                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{customer.bookings_count}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(customer.first_booking).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewDetails(customer);
                                                        }}
                                                    >
                                                        <Eye size={12} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {customers.map((customer, index) => (
                                    <div 
                                        key={`${customer.email}-${index}`} 
                                        className="p-4 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                        onClick={() => handleViewDetails(customer)}
                                    >
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
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewDetails(customer);
                                                }}
                                            >
                                                <Eye size={12} />
                                            </Button>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 gap-2 text-sm mb-3">
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
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900 dark:text-white">{customer.bookings_count} {customer.bookings_count === 1 ? 'Booking' : 'Bookings'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <CustomerDetailsDialog
                customer={selectedCustomer}
                isOpen={showDetailsDialog}
                onClose={() => setShowDetailsDialog(false)}
            />
        </AppLayout>
    );
}