import { type Destination } from '@/services/api';
import { Link } from '@inertiajs/react';
import {
    Clock,
    Filter,
    Heart,
    MapPin,
    Search,
    Star,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const categories = ['All', 'Wildlife', 'Adventure', 'Cultural', 'Beach', 'Plantations', 'Charity'];
const countries = ['All', 'Kenya', 'Tanzania'];
const tours = ['All', '4X4 Safaris', 'Day Tours', 'Kenya Camping Safaris', 'Kenya - Tanzania Safaris', 'Kenya Wildlife Safaris', 'Mountain Climbing', 'Tanzania Wildlife Safaris', 'Plantations', 'Charity', 'Beaches'];
const tourValues = ['All', '4x4-safaris', 'day-tours', 'kenya-camping-safaris', 'kenya-tanzania-safaris', 'kenya-wildlife-safaris', 'mountain-climbing', 'tanzania-wildlife-safaris', 'plantations', 'charity', 'beaches'];

export default function DestinationGrid() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [selectedTour, setSelectedTour] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

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

    const filteredDestinations = destinations.filter((destination) => {
        const matchesSearch =
            destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            destination.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'All' ||
            destination.category === selectedCategory;
        const matchesCountry =
            selectedCountry === 'All' ||
            destination.location === selectedCountry;
        const matchesTour =
            selectedTour === 'All' ||
            (Array.isArray(destination.tour) 
                ? destination.tour.includes(tourValues[tours.indexOf(selectedTour)])
                : destination.tour === tourValues[tours.indexOf(selectedTour)]);

        return matchesSearch && matchesCategory && matchesCountry && matchesTour;
    });

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
                        <span className="text-sm text-gray-500">
                            {destination.location}
                        </span>
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-gray-900 line-clamp-1">
                        {destination.name}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-relaxed">
                        {destination.description.replace(/<[^>]*>/g, '')}
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

    if (loading) {
        return (
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-brand-primary"></div>
                            <p className="text-gray-600">
                                Loading destinations...
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Search and Filters */}
                <div className="mb-12">
                    {/* Mobile Search + Filter Button */}
                    <div className="mb-6 flex gap-3 lg:hidden">
                        <div className="relative flex-1">
                            <Search
                                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-3 font-medium transition-all shadow-sm ${
                                showFilters 
                                    ? 'bg-brand-primary text-white' 
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <Filter size={18} />
                            <span className="hidden sm:inline">Filters</span>
                        </button>
                    </div>

                    {/* Desktop Search + Filters */}
                    <div className="hidden lg:flex items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search
                                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all min-w-[120px]"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all min-w-[120px]"
                            >
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedTour}
                                onChange={(e) => setSelectedTour(e.target.value)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all min-w-[140px]"
                            >
                                {tours.map((tour) => (
                                    <option key={tour} value={tour}>
                                        {tour}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Mobile Filters Dropdown */}
                    {showFilters && (
                        <div className="mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-6 lg:hidden shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Filter Options</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                                    >
                                        {countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Tour Type</label>
                                    <select
                                        value={selectedTour}
                                        onChange={(e) => setSelectedTour(e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                                    >
                                        {tours.map((tour) => (
                                            <option key={tour} value={tour}>
                                                {tour}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results Count & Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                Popular Destinations
                            </h2>
                            <p className="text-gray-600">
                                Discover the most sought-after wildlife and adventure destinations in East Africa
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                            <span className="font-medium">{filteredDestinations.length}</span>
                            <span>of</span>
                            <span className="font-medium">{destinations.length}</span>
                            <span>destinations</span>
                        </div>
                    </div>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDestinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                        />
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="py-16 text-center">
                        <div className="mb-4 text-gray-400">
                            <Search size={64} className="mx-auto" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">
                            No destinations found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
