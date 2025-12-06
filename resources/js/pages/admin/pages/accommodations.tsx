import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Building2,
    Plus,
    ExternalLink,
    MapPin,
    Star,
    Grid3X3,
    List,
    Eye,
    X,
    RefreshCw,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AccommodationDetailsDialog from '@/admin/dialogs/accommodation-details-dialog';
import { useLayoutPreference } from '@/hooks/use-layout-preference';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Accommodations', href: '/admin/accommodations' },
];

interface Accommodation {
    id: string;
    name: string;
    location: string;
    rating: number;
    description: string;
    website: string;
    image_url?: string;
}

interface AccommodationsProps {
    accommodations: Accommodation[];
}

export default function AdminAccommodations({
    accommodations,
}: AccommodationsProps) {
    const [showAddForm, setShowAddForm] = useState(false);
    const { layoutMode, updateLayoutMode } = useLayoutPreference();
    const [selectedAccommodation, setSelectedAccommodation] =
        useState<Accommodation | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const handleViewDetails = (accommodation: Accommodation) => {
        setSelectedAccommodation(accommodation);
        setShowDetailsDialog(true);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        location: '',
        rating: '',
        description: '',
        website: '',
        image_url: '',
    });

    const handleAddAccommodation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/accommodations', {
            onSuccess: () => {
                setShowAddForm(false);
                reset();
            },
        });
    };

    const handleRefresh = () => {
        router.reload();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accommodations - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Accommodations
                    </h1>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                        >
                            <RefreshCw size={16} />
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={
                                    layoutMode === 'grid'
                                        ? 'default'
                                        : 'outline'
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
                                    layoutMode === 'table'
                                        ? 'default'
                                        : 'outline'
                                }
                                size="sm"
                                onClick={() => updateLayoutMode('table')}
                                className="flex items-center gap-2"
                            >
                                <List size={16} />
                                Table
                            </Button>
                        </div>
                        <Button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Accommodation
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="p-6">
                        {accommodations.length === 0 ? (
                            <div className="py-12 text-center">
                                <Building2
                                    size={48}
                                    className="mx-auto mb-4 text-gray-400"
                                />
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                    No accommodations yet
                                </h3>
                                <p className="mb-4 text-gray-500 dark:text-gray-400">
                                    Start by adding your first accommodation.
                                </p>
                            </div>
                        ) : layoutMode === 'table' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Location
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Rating
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Website
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accommodations.map((accommodation) => (
                                            <tr
                                                key={accommodation.id}
                                                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                                onClick={() =>
                                                    handleViewDetails(
                                                        accommodation,
                                                    )
                                                }
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                                                            <Building2
                                                                size={16}
                                                                className="text-blue-600 dark:text-blue-400"
                                                            />
                                                        </div>
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {accommodation.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {accommodation.location}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Star
                                                            size={14}
                                                            className="fill-current text-yellow-500"
                                                        />
                                                        {accommodation.rating}
                                                    </div>
                                                </td>
                                                <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {accommodation.description}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <a
                                                        href={
                                                            accommodation.website
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                                    >
                                                        <ExternalLink
                                                            size={12}
                                                        />
                                                        Visit
                                                    </a>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewDetails(
                                                                accommodation,
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
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {accommodations.map((accommodation) => (
                                    <div
                                        key={accommodation.id}
                                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                        onClick={() =>
                                            handleViewDetails(accommodation)
                                        }
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <Building2
                                                        size={20}
                                                        className="text-blue-600"
                                                    />
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        {accommodation.name}
                                                    </h3>
                                                </div>
                                                <div className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={16} />
                                                        {accommodation.location}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star
                                                            size={16}
                                                            className="fill-current text-yellow-500"
                                                        />
                                                        {accommodation.rating}
                                                    </div>
                                                </div>
                                                <p className="mb-4 text-gray-700 dark:text-gray-300">
                                                    {accommodation.description}
                                                </p>
                                                <a
                                                    href={accommodation.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                                >
                                                    <ExternalLink size={16} />
                                                    Visit Website
                                                </a>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewDetails(
                                                        accommodation,
                                                    );
                                                }}
                                            >
                                                <Eye size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {showAddForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                        onClick={() => setShowAddForm(false)}
                    >
                        <div
                            className="w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Add New Accommodation
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    <X size={20} />
                                </Button>
                            </div>
                            <form
                                onSubmit={handleAddAccommodation}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Hotel Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter hotel name"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter location"
                                        required
                                    />
                                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Rating
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={data.rating}
                                        onChange={(e) => setData('rating', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="4.5"
                                        required
                                    />
                                    {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Website URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="https://example.com"
                                        required
                                    />
                                    {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Image URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter description"
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="flex-1" disabled={processing}>
                                        {processing ? 'Adding...' : 'Add Accommodation'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAddForm(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <AccommodationDetailsDialog
                accommodation={selectedAccommodation}
                isOpen={showDetailsDialog}
                onClose={() => setShowDetailsDialog(false)}
            />
        </AppLayout>
    );
}
