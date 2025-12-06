import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { Clock, Heart, MapPin, Users, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { type Destination } from '@/services/api';

interface ToursProps {
    category?: string;
}

export default function Tours({ category }: ToursProps) {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await fetch('/api/destinations');
            const data = await response.json();
            setDestinations(data);
        } catch (error) {
            console.error('Failed to fetch destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDestinations = category
        ? destinations.filter((dest) => 
            Array.isArray(dest.tour) 
                ? dest.tour.includes(category)
                : dest.tour === category
          )
        : destinations;

    return (
        <PublicLayout>
            <Head title="Tours - WildBliss Tours" />

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-brand-primary py-16 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            {category
                                ? `${category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Tours`
                                : 'Our Safari Tours'}
                        </h1>
                        <p className="text-xl text-blue-100">
                            {category
                                ? `Explore our specialized ${category.replace(/-/g, ' ')} experiences`
                                : "Discover Kenya's incredible wildlife and landscapes with our expertly crafted safari experiences"}
                        </p>
                    </div>
                </div>

                {/* Tours Grid */}
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-brand-primary"></div>
                                <p className="text-gray-600">
                                    Loading destinations...
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredDestinations.map((destination) => (
                                <div
                                    key={destination.id}
                                    className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
                                >
                                    <Link
                                        href={`/destination/${destination.id}`}
                                        className="block"
                                    >
                                        <div className="relative">
                                            <img
                                                src={destination.image_url}
                                                alt={destination.name}
                                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute top-3 left-3 rounded bg-brand-primary px-3 py-1 text-xs font-bold text-white">
                                                {destination.category}
                                            </div>
                                            <button
                                                className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <Heart
                                                    size={16}
                                                    className="text-gray-600"
                                                />
                                            </button>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900 capitalize transition-colors group-hover:text-brand-primary">
                                                {destination.name}
                                            </h3>
                                            <p className="mb-4 line-clamp-2 text-gray-600">
                                                {destination.description}
                                            </p>

                                            <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Star
                                                        size={16}
                                                        className="fill-current text-yellow-400"
                                                    />
                                                    <span>
                                                        {destination.rating}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={16} />
                                                    <span>
                                                        {destination.duration}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={16} />
                                                    <span>
                                                        {destination.group_size}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <MapPin size={16} />
                                                    <span>
                                                        {destination.location}
                                                    </span>
                                                </div>
                                                <span className="font-medium text-brand-secondary transition-colors group-hover:text-brand-secondary-hover">
                                                    View Details →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                            {filteredDestinations.length === 0 && (
                                <div className="col-span-full py-12 text-center">
                                    <p className="text-lg text-gray-500">
                                        No destinations found for this tour
                                        category.
                                    </p>
                                    <Link
                                        href="/tours"
                                        className="mt-4 inline-block text-brand-primary transition-colors hover:text-brand-secondary"
                                    >
                                        View All Tours →
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
