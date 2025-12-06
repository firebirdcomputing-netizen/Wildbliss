import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Eye,
    User,
    Mail,
    Phone,
    Globe,
    Calendar,
    Grid3X3,
    List,
} from 'lucide-react';
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
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
        null,
    );
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
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Customers
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={
                                layoutMode === 'grid' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => updateLayoutMode('grid')}
                            className="flex items-center gap-2"
                        >
                            <Grid3X3 size={16} />
                            Grid
                        </Button>
                        <Button
                            variant={
                                layoutMode === 'table' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => updateLayoutMode('table')}
                            className="flex items-center gap-2"
                        >
                            <List size={16} />
                            Table
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="p-6">
                        {customers.length === 0 ? (
                            <div className="py-12 text-center">
                                <User
                                    size={48}
                                    className="mx-auto mb-4 text-gray-400"
                                />
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                    No customers yet
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Customers will appear here once bookings are
                                    made.
                                </p>
                            </div>
                        ) : layoutMode === 'table' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Customer
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Email
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Phone
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Country
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Bookings
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Since
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((customer, index) => (
                                            <tr
                                                key={`${customer.email}-${index}`}
                                                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                                onClick={() =>
                                                    handleViewDetails(customer)
                                                }
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                                                            <User
                                                                size={16}
                                                                className="text-purple-600 dark:text-purple-400"
                                                            />
                                                        </div>
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {customer.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {customer.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {customer.phone}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {customer.country}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                                    {customer.bookings_count}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(
                                                        customer.first_booking,
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewDetails(
                                                                customer,
                                                            );
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
                                        className="cursor-pointer rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                        onClick={() =>
                                            handleViewDetails(customer)
                                        }
                                    >
                                        <div className="mb-3 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                                                    <User
                                                        size={20}
                                                        className="text-purple-600 dark:text-purple-400"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {customer.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Customer since{' '}
                                                        {new Date(
                                                            customer.first_booking,
                                                        ).toLocaleDateString()}
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

                                        <div className="mb-3 grid grid-cols-1 gap-2 text-sm">
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
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {customer.bookings_count}{' '}
                                                {customer.bookings_count === 1
                                                    ? 'Booking'
                                                    : 'Bookings'}
                                            </p>
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
