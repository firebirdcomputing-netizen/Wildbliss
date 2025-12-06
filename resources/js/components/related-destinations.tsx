import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import { type Destination } from '@/services/api';

interface RelatedDestinationsProps {
    currentDestination: Destination;
}

export default function RelatedDestinations({ currentDestination }: RelatedDestinationsProps) {
    const [relatedDestinations, setRelatedDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRelatedDestinations();
    }, [currentDestination.id]);

    const fetchRelatedDestinations = async () => {
        try {
            const response = await fetch('/api/destinations');
            const allDestinations = await response.json();
            
            // Filter out current destination and get random related ones
            const otherDestinations = allDestinations.filter(
                (dest: Destination) => dest.id !== currentDestination.id
            );
            
            // Shuffle and take first 3
            const shuffled = otherDestinations.sort(() => 0.5 - Math.random());
            setRelatedDestinations(shuffled.slice(0, 3));
        } catch (error) {
            console.error('Failed to fetch related destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="rounded-2xl bg-white border border-gray-200 p-8">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">Related Destinations</h3>
                <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent"></div>
                </div>
            </div>
        );
    }

    if (relatedDestinations.length === 0) {
        return null;
    }

    return (
        <div className="rounded-2xl bg-white border border-gray-200 p-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Related Destinations</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedDestinations.map((destination) => (
                    <Link
                        key={destination.id}
                        href={`/destination/${destination.id}`}
                        className="group block rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="relative aspect-[4/3]">
                            <img
                                src={destination.image_url || '/destinations/masai-mara.jpg'}
                                alt={destination.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3 bg-brand-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
                                {destination.category}
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                                {destination.name}
                            </h4>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                <MapPin size={14} />
                                {destination.location}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="fill-current text-yellow-500" />
                                    {destination.rating}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {destination.duration}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}