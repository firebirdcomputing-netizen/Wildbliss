import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewDialog from './dialogs/review-dialog';

export default function InspirationSection() {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [featuredReviews, setFeaturedReviews] = useState([]);
    const [currentReview, setCurrentReview] = useState(0);

    useEffect(() => {
        fetchFeaturedReviews();
    }, []);

    const fetchFeaturedReviews = async () => {
        try {
            const response = await fetch('/api/reviews/featured');
            if (response.ok) {
                const data = await response.json();
                setFeaturedReviews(data);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    const nextReview = () => {
        setCurrentReview((prev) => {
            const next = prev + 3;
            return next >= featuredReviews.length ? 0 : next;
        });
    };

    const prevReview = () => {
        setCurrentReview((prev) => {
            const previous = prev - 3;
            return previous < 0 ? Math.max(0, featuredReviews.length - 3) : previous;
        });
    };
    const trips = [
        {
            image: '/destinations/masai-mara.jpg',
            title: 'Kenya Safari for Seniors',
            date: 'May 21, 2025',
            category: 'Wildlife Safari',
        },
        {
            image: '/destinations/migration-Serengeti.jpg',
            title: 'The Great Wildebeest Migration',
            date: 'May 20, 2025',
            category: 'Wildlife Experience',
        },
        {
            image: '/destinations/tsavo.jpg',
            title: 'Home of the African Elephant',
            date: 'September 15, 2024',
            category: 'Wildlife Safari',
        },
        {
            image: '/destinations/amboseli.jpg',
            title: 'Theatre of the Wild',
            date: 'September 15, 2024',
            category: 'Adventure Tour',
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Get Inspiration for Your Next Trip
                    </h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Embark on an unforgettable journey filled with adventure, culture, and breathtaking landscapes.
                        Whether you're seeking thrilling wildlife safaris, relaxing beach escapes, or immersive cultural experiences,
                        the world is yours to explore. Let your next adventure be one that excites your soul and creates memories to last a lifetime.
                    </p>
                </div>

                {/* Grid of Trip Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trips.map((trip, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] shadow-md">
                                <img
                                    src={trip.image}
                                    alt={trip.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                                        {trip.category}
                                    </span>
                                </div>

                                {/* Hover Content */}
                                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white/30">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
                                    {trip.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium">
                                    {trip.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            What Our Travelers Say
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Hear from fellow adventurers who have experienced the magic of East Africa with us.
                        </p>
                    </div>

                    {featuredReviews.length > 0 ? (
                        <div className="relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                {featuredReviews.slice(currentReview, currentReview + 3).map((review, index) => (
                                    <div key={review.id || index} className="bg-white rounded-2xl shadow-lg p-8 h-64 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-center mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        className={`${
                                                            i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <blockquote className="text-sm text-gray-700 mb-4 italic leading-relaxed line-clamp-4">
                                                "{review.review}"
                                            </blockquote>
                                        </div>
                                        <div className="font-semibold text-gray-900 text-center">
                                            {review.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {featuredReviews.length > 3 && (
                                <>
                                    <button
                                        onClick={prevReview}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all z-10"
                                    >
                                        <ChevronLeft size={24} className="text-gray-600" />
                                    </button>
                                    <button
                                        onClick={nextReview}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all z-10"
                                    >
                                        <ChevronRight size={24} className="text-gray-600" />
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
                            <p className="text-gray-500 mb-4">No reviews yet. Be the first to share your experience!</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <button
                            onClick={() => setShowReviewModal(true)}
                            className="bg-brand-secondary hover:bg-brand-secondary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Share Your Experience
                        </button>
                    </div>
                </div>
            </div>
            
            <ReviewDialog
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
            />
        </section>
    );
}
