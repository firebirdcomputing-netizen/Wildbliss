import { Link } from '@inertiajs/react';
import { Heart, Star, Clock, Users, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { type Destination } from '@/services/api';

export default function PopularTours() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await fetch('/api/destinations');
            const data = await response.json();
            setDestinations(data.slice(0, 3)); // Only show first 3
        } catch (error) {
            console.error('Failed to fetch destinations:', error);
        } finally {
            setLoading(false);
        }
    };



    const DestinationCard = ({ destination }) => (
        <Link
            href={`/destination/${destination.id}`}
            className="group relative block cursor-pointer"
        >
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={destination.image_url || '/destinations/masai-mara.jpg'}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-brand-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                        {destination.category}
                    </div>
                    <button className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm p-2 transition-all hover:bg-white hover:scale-110">
                        <Heart size={16} className="text-brand-primary" />
                    </button>
                </div>

                <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-500">{destination.location}</span>
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-brand-primary transition-colors">
                        {destination.name}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-relaxed">
                        {destination.description}
                    </p>

                    <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Star size={14} className="fill-current text-yellow-400" />
                            <span className="font-medium">{destination.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{destination.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{destination.group_size}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs font-medium text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-full">
                            {destination.type}
                        </span>
                        <span className="text-sm font-semibold text-brand-secondary group-hover:text-brand-primary transition-colors">
                            View Details →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );



    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
                {/* Most Popular Tours */}
                <div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Most Popular Tours</h2>
                        <p className="text-gray-600">Here are some of the most popular tours for a Kenyan wild adventure</p>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-brand-primary"></div>
                                <p className="text-gray-600">Loading destinations...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {destinations.map((destination) => (
                                <DestinationCard key={destination.id} destination={destination} />
                            ))}
                        </div>
                    )}
                </div>


            </div>
        </section>
    );
}
