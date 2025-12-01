import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { MapPin, Camera, Star, ArrowRight, Clock, Users } from 'lucide-react';

export default function Places() {
    const places = [
        {
            id: 1,
            name: 'Masai Mara',
            type: 'National Reserve',
            image: '/destinations/masai-mara.jpg',
            description: 'World-famous for the Great Migration, Masai Mara offers unparalleled wildlife viewing opportunities with lions, leopards, cheetahs, and elephants.',
            highlights: ['Great Migration', 'Big Five', 'Maasai Culture', 'Hot Air Balloons'],
            bestTime: 'July - October'
        },
        {
            id: 2,
            name: 'Amboseli',
            type: 'National Park',
            image: '/destinations/amboseli.jpg',
            description: 'Famous for its large elephant herds and stunning views of Mount Kilimanjaro, Amboseli offers incredible photography opportunities.',
            highlights: ['Elephant Herds', 'Mount Kilimanjaro Views', 'Swamp Areas', 'Bird Watching'],
            bestTime: 'June - October'
        },
        {
            id: 3,
            name: 'Lake Nakuru',
            type: 'National Park',
            image: '/destinations/nakuru.jpg',
            description: 'A birdwatcher\'s paradise known for its flamingo populations, rhinos, and diverse wildlife in a compact park setting.',
            highlights: ['Flamingo Flocks', 'Black & White Rhinos', 'Leopards', 'Baboon Cliff'],
            bestTime: 'Year Round'
        },
        {
            id: 4,
            name: 'Tsavo East & West',
            type: 'National Parks',
            image: '/destinations/tsavo.jpg',
            description: 'Kenya\'s largest national park complex, famous for red elephants, diverse landscapes, and the man-eating lions of Tsavo.',
            highlights: ['Red Elephants', 'Mzima Springs', 'Lugard Falls', 'Diverse Landscapes'],
            bestTime: 'June - October'
        }
    ];

    return (
        <PublicLayout>
            <Head title="Places - WildBliss Tours" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary/90 text-white py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Kenya's Wildlife Destinations</h1>
                            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                Discover the most spectacular national parks and reserves that Kenya has to offer
                            </p>
                        </div>
                    </div>
                </div>

                {/* Places Grid */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Kenya's Premier Safari Destinations</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From the world-famous Masai Mara to the elephant paradise of Amboseli, explore Kenya's most iconic wildlife destinations
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {places.map((place) => (
                            <div key={place.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="md:flex h-full">
                                    <div className="md:w-1/2 relative overflow-hidden">
                                        <img
                                            src={place.image}
                                            alt={place.name}
                                            className="w-full h-64 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-brand-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                {place.type}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="md:w-1/2 p-6 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MapPin size={18} className="text-brand-primary" />
                                            <span className="text-sm text-gray-500 font-medium">{place.type}</span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
                                            {place.name}
                                        </h3>
                                        
                                        <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                                            {place.description}
                                        </p>
                                        
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Highlights</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {place.highlights.map((highlight, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium text-center"
                                                    >
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-brand-primary" />
                                                <span className="text-sm text-gray-600 font-medium">{place.bestTime}</span>
                                            </div>
                                            <Link 
                                                href={`/destination?location=${encodeURIComponent(place.name)}`}
                                                className="bg-brand-secondary text-white px-6 py-2 rounded-xl hover:bg-brand-secondary/90 transition-all flex items-center gap-2 font-semibold text-sm hover:gap-3"
                                            >
                                                View Tours
                                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}