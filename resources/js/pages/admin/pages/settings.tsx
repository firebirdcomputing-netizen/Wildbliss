import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Building2, Plus, ExternalLink, MapPin, Star } from 'lucide-react';
import { useState } from 'react';

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

export default function AdminAccommodations() {
    const [accommodations] = useState<Accommodation[]>([
        {
            id: '1',
            name: 'Serena Safari Lodge',
            location: 'Maasai Mara',
            rating: 4.8,
            description: 'Luxury safari lodge with stunning views of the Mara River',
            website: 'https://serenahotels.com',
            image_url: '/images/serena-lodge.jpg'
        },
        {
            id: '2',
            name: 'Amboseli Serena Safari Lodge',
            location: 'Amboseli National Park',
            rating: 4.6,
            description: 'Beautiful lodge with views of Mount Kilimanjaro',
            website: 'https://serenahotels.com/amboseli',
        }
    ]);
    const [showAddForm, setShowAddForm] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accommodations - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Accommodations
                    </h1>
                    <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                        <Plus size={20} />
                        Add Accommodation
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {accommodations.map((accommodation) => (
                        <div key={accommodation.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Building2 size={20} className="text-blue-600" />
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {accommodation.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            {accommodation.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="fill-current text-yellow-500" />
                                            {accommodation.rating}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
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
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Accommodation</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Hotel Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter hotel name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Website URL
                                    </label>
                                    <input
                                        type="url"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter description"
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="flex-1">Add Accommodation</Button>
                                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
