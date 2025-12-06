import ConfirmationDialog from '@/admin/dialogs/confirmation-dialog';
import DestinationDialog from '@/admin/dialogs/destination-dialog';
import DestinationDetailsDialog from '@/admin/dialogs/destination-details-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { apiService, type Destination } from '@/services/api';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Edit, MapPin, Plus, RefreshCw, Trash2, Grid3X3, List } from 'lucide-react';
import { useState } from 'react';
import { useLayoutPreference } from '@/hooks/use-layout-preference';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Destinations', href: '/admin/destinations' },
];

interface Props {
    destinations: Destination[];
}

export default function Destinations({ destinations }: Props) {
    const { layoutMode, updateLayoutMode } = useLayoutPreference();
    const [showDialog, setShowDialog] = useState(false);
    const [editingDestination, setEditingDestination] =
        useState<Destination | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<Destination | null>(
        null,
    );
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const handleEdit = (destination: Destination) => {
        setEditingDestination(destination);
        setShowDialog(true);
    };

    const handleViewDetails = (destination: Destination) => {
        setSelectedDestination(destination);
        setShowDetailsDialog(true);
    };

    const handleDelete = (destination: Destination) => {
        apiService.deleteDestination(destination.id, {
            onSuccess: () => setConfirmDelete(null),
        });
    };

    const refresh = () => {
        router.reload();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Destinations - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Destinations
                    </h1>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={refresh}>
                            <RefreshCw size={16} />
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={layoutMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateLayoutMode('grid')}
                                className="flex items-center gap-2"
                            >
                                <Grid3X3 size={16} />
                                Grid
                            </Button>
                            <Button
                                variant={layoutMode === 'table' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateLayoutMode('table')}
                                className="flex items-center gap-2"
                            >
                                <List size={16} />
                                Table
                            </Button>
                        </div>
                        <Button
                            className="flex items-center gap-2"
                            onClick={() => {
                                setEditingDestination(null);
                                setShowDialog(true);
                            }}
                        >
                            <Plus size={16} />
                            Add Destination
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {destinations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-6 py-16">
                            <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                                <MapPin
                                    size={32}
                                    className="text-gray-400 dark:text-gray-500"
                                />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No destinations yet
                            </h3>
                            <p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">
                                Start building your tour catalog by adding your
                                first destination. Destinations are the amazing
                                places your customers will visit.
                            </p>
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => {
                                    setEditingDestination(null);
                                    setShowDialog(true);
                                }}
                            >
                                <Plus size={16} />
                                Add Your First Destination
                            </Button>
                        </div>
                    ) : layoutMode === 'table' ? (
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Destination</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Tours</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {destinations.map((destination) => (
                                            <tr 
                                                key={destination.id} 
                                                className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                                onClick={() => handleViewDetails(destination)}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {destination.image_url ? (
                                                            <img src={destination.image_url} alt={destination.name} className="w-12 h-12 rounded-lg object-cover" />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                                                <MapPin size={16} className="text-gray-400" />
                                                            </div>
                                                        )}
                                                        <span className="font-medium text-gray-900 dark:text-white">{destination.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{destination.type}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{destination.description}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        destination.status === 'active'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                    }`}>
                                                        {destination.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{destination.tours_count}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-1">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEdit(destination);
                                                            }}
                                                        >
                                                            <Edit size={14} />
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setConfirmDelete(destination);
                                                            }} 
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {destinations.map((destination) => (
                                    <div
                                        key={destination.id}
                                        className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:border-brand-primary hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:hover:border-brand-primary cursor-pointer"
                                        onClick={() => handleViewDetails(destination)}
                                    >
                                        {destination.image_url ? (
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={destination.image_url}
                                                    alt={destination.name}
                                                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                <div className="absolute top-3 right-3">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            destination.status ===
                                                            'active'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                        }`}
                                                    >
                                                        {destination.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex h-48 items-center justify-center bg-gray-100 dark:bg-gray-600">
                                                <MapPin
                                                    size={48}
                                                    className="text-gray-400 dark:text-gray-500"
                                                />
                                            </div>
                                        )}

                                        <div className="p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {destination.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {destination.type}
                                                    </p>
                                                </div>
                                            </div>

                                            {destination.description && (
                                                <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                                                    {destination.description}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {destination.tours_count}{' '}
                                                    tours
                                                </span>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(destination);
                                                        }}
                                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <Edit size={14} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setConfirmDelete(destination);
                                                        }}
                                                        className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-700"
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showDialog && (
                <DestinationDialog
                    destination={editingDestination}
                    onClose={() => {
                        setShowDialog(false);
                        setEditingDestination(null);
                    }}
                />
            )}

            <DestinationDetailsDialog
                destination={selectedDestination}
                isOpen={showDetailsDialog}
                onClose={() => setShowDetailsDialog(false)}
                onEdit={(destination) => {
                    setShowDetailsDialog(false);
                    handleEdit(destination);
                }}
                onDelete={(destination) => {
                    setShowDetailsDialog(false);
                    setConfirmDelete(destination);
                }}
            />

            {confirmDelete && (
                <ConfirmationDialog
                    title="Delete Destination"
                    message={`Are you sure you want to delete "${confirmDelete.name}"? This action cannot be undone.`}
                    confirmText="Delete"
                    onConfirm={() => handleDelete(confirmDelete)}
                    onCancel={() => setConfirmDelete(null)}
                    variant="danger"
                />
            )}
        </AppLayout>
    );
}
