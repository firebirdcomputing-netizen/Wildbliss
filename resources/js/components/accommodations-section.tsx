import { useState, useEffect } from 'react';
import { Building2, Star, MapPin, ExternalLink } from 'lucide-react';

interface Accommodation {
    id: string;
    name: string;
    location: string;
    rating: number;
    description: string;
    website: string;
    image_url?: string;
}

interface AccommodationsSectionProps {
    destinationId: string;
}

export default function AccommodationsSection({ destinationId }: AccommodationsSectionProps) {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAccommodations();
    }, [destinationId]);

    const fetchAccommodations = async () => {
        try {
            const response = await fetch(`/api/destinations/${destinationId}/accommodations`);
            if (response.ok) {
                const data = await response.json();
                setAccommodations(data);
            }
        } catch (error) {
            console.error('Failed to fetch accommodations:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="rounded-2xl bg-white border border-gray-200 p-8">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">Available Accommodations</h3>
                <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent"></div>
                </div>
            </div>
        );
    }

    if (accommodations.length === 0) {
        return null;
    }

    return (
        <div className="rounded-2xl bg-white border border-gray-200 p-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">Available Accommodations</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {accommodations.map((accommodation) => (
                    <div
                        key={accommodation.id}
                        className="rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Building2 size={20} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                    {accommodation.name}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {accommodation.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="fill-current text-yellow-500" />
                                        {accommodation.rating}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                            {accommodation.description}
                        </p>
                        
                        <a
                            href={accommodation.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium"
                        >
                            <ExternalLink size={16} />
                            Visit Website
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}