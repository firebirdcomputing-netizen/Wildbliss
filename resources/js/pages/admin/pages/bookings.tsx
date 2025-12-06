import BookingDetailsDialog from '@/admin/dialogs/booking-details-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Eye,
    Filter,
    Grid3X3,
    List,
    RefreshCw,
    Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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

interface PaginatedBookings {
    data: Booking[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface BookingsProps {
    bookings: PaginatedBookings;
    filters: {
        search?: string;
        status?: string;
    };
}

export default function Bookings({ bookings, filters }: BookingsProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
        null,
    );
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'pending' | 'confirmed' | 'cancelled'
    >((filters.status as any) || 'all');

    const handleSearch = () => {
        router.get(
            '/admin/bookings',
            {
                search: searchTerm || undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handlePageChange = (page: number) => {
        router.get(
            '/admin/bookings',
            {
                page,
                search: searchTerm || undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        handleSearch();
    }, [statusFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bookings - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Bookings
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.reload()}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </Button>
                        <Button
                            variant={
                                viewMode === 'grid' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="flex items-center gap-2"
                        >
                            <Grid3X3 size={16} />
                            Grid
                        </Button>
                        <Button
                            variant={
                                viewMode === 'table' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setViewMode('table')}
                            className="flex items-center gap-2"
                        >
                            <List size={16} />
                            Table
                        </Button>
                    </div>
                </div>

                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <Search
                                    size={20}
                                    className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, country, or booking ID..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-500" />
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value as
                                            | 'all'
                                            | 'pending'
                                            | 'confirmed'
                                            | 'cancelled',
                                    )
                                }
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="p-6">
                        {bookings.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <Calendar
                                    size={48}
                                    className="mx-auto mb-4 text-gray-400"
                                />
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                    No bookings found
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Try adjusting your search or filter
                                    criteria.
                                </p>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {bookings.data.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md dark:border-gray-600"
                                        onClick={() =>
                                            setSelectedBooking(booking)
                                        }
                                    >
                                        <div className="mb-3 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                                                    <Calendar
                                                        size={16}
                                                        className="text-blue-600 dark:text-blue-400"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        #{booking.id}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(
                                                            booking.created_at,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
                                                    booking.status ===
                                                    'confirmed'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : booking.status ===
                                                            'pending'
                                                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {booking.name}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {booking.email}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {booking.country}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-600">
                                            <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                                                ID
                                            </th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                                                Email
                                            </th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                                                Country
                                            </th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                                                Travel Date
                                            </th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.data.map((booking) => (
                                            <tr
                                                key={booking.id}
                                                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                                                onClick={() =>
                                                    setSelectedBooking(booking)
                                                }
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                    #{booking.id}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                    {booking.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {booking.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {booking.country}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(
                                                        booking.travel_date,
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
                                                            booking.status ===
                                                            'confirmed'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : booking.status ===
                                                                    'pending'
                                                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedBooking(
                                                                booking,
                                                            );
                                                        }}
                                                    >
                                                        <Eye size={14} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {bookings.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-600">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {bookings.from} to {bookings.to} of{' '}
                                    {bookings.total} bookings
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(
                                                bookings.current_page - 1,
                                            )
                                        }
                                        disabled={bookings.current_page === 1}
                                        className="flex items-center gap-1"
                                    >
                                        <ChevronLeft size={16} />
                                        Previous
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {Array.from(
                                            { length: bookings.last_page },
                                            (_, i) => i + 1,
                                        )
                                            .filter(
                                                (page) =>
                                                    page === 1 ||
                                                    page ===
                                                        bookings.last_page ||
                                                    (page >=
                                                        bookings.current_page -
                                                            1 &&
                                                        page <=
                                                            bookings.current_page +
                                                                1),
                                            )
                                            .map((page, index, array) => (
                                                <div
                                                    key={page}
                                                    className="flex items-center"
                                                >
                                                    {index > 0 &&
                                                        array[index - 1] !==
                                                            page - 1 && (
                                                            <span className="px-2 text-gray-400">
                                                                ...
                                                            </span>
                                                        )}
                                                    <Button
                                                        variant={
                                                            bookings.current_page ===
                                                            page
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                page,
                                                            )
                                                        }
                                                        className="min-w-[40px]"
                                                    >
                                                        {page}
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(
                                                bookings.current_page + 1,
                                            )
                                        }
                                        disabled={
                                            bookings.current_page ===
                                            bookings.last_page
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        Next
                                        <ChevronRight size={16} />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <BookingDetailsDialog
                    booking={selectedBooking}
                    isOpen={!!selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            </div>
        </AppLayout>
    );
}
