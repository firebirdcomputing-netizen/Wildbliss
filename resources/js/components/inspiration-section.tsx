import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
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
            const next = prev + 1;
            return next >= featuredReviews.length ? 0 : next;
        });
    };

    const prevReview = () => {
        setCurrentReview((prev) => {
            const previous = prev - 1;
            return previous < 0 ? featuredReviews.length - 1 : previous;
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
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                        Get Inspiration for Your Next Trip
                    </h2>
                    <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-600">
                        Embark on an unforgettable journey filled with
                        adventure, culture, and breathtaking landscapes. Whether
                        you're seeking thrilling wildlife safaris, relaxing
                        beach escapes, or immersive cultural experiences, the
                        world is yours to explore. Let your next adventure be
                        one that excites your soul and creates memories to last
                        a lifetime.
                    </p>
                </div>

                {/* Grid of Trip Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {trips.map((trip, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                                <img
                                    src={trip.image}
                                    alt={trip.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="rounded-full bg-brand-secondary px-3 py-1 text-xs font-medium text-white">
                                        {trip.category}
                                    </span>
                                </div>

                                {/* Hover Content */}
                                <div className="absolute right-4 bottom-4 left-4 translate-y-4 transform text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <button className="rounded-lg border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-brand-primary">
                                    {trip.title}
                                </h3>
                                <p className="text-sm font-medium text-gray-500">
                                    {trip.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <div className="mb-12 text-center">
                        <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                            What Our Travelers Say
                        </h3>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Hear from fellow adventurers who have experienced
                            the magic of East Africa with us.
                        </p>
                    </div>

                    {featuredReviews.length > 0 ? (
                        <div className="relative">
                            {/* Mobile Carousel */}
                            <div className="md:hidden">
                                <div className="overflow-hidden">
                                    <div
                                        className="flex transition-transform duration-300 ease-in-out"
                                        style={{
                                            transform: `translateX(-${currentReview * 100}%)`,
                                        }}
                                    >
                                        {featuredReviews.map(
                                            (review, index) => (
                                                <div
                                                    key={review.id || index}
                                                    className="w-full flex-shrink-0 px-4"
                                                >
                                                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                                                        <div className="flex flex-col items-center text-center">
                                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 shadow-md">
                                                                <User
                                                                    size={24}
                                                                    className="text-gray-600"
                                                                />
                                                            </div>
                                                            <div className="mb-4 flex justify-center">
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <Star
                                                                            key={
                                                                                i
                                                                            }
                                                                            size={
                                                                                18
                                                                            }
                                                                            className={`${
                                                                                i <
                                                                                review.rating
                                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                                    : 'text-gray-300'
                                                                            } mx-0.5`}
                                                                        />
                                                                    ),
                                                                )}
                                                            </div>
                                                            <blockquote className="mb-6 line-clamp-4 text-sm leading-relaxed text-gray-700 italic">
                                                                "{review.review}
                                                                "
                                                            </blockquote>
                                                            <div className="mt-auto">
                                                                <div className="text-base font-semibold text-gray-900">
                                                                    {
                                                                        review.name
                                                                    }
                                                                </div>
                                                                <div className="mt-1 text-sm text-gray-500">
                                                                    Verified
                                                                    Traveler
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                {featuredReviews.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevReview}
                                            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:shadow-xl"
                                        >
                                            <ChevronLeft
                                                size={20}
                                                className="text-gray-600"
                                            />
                                        </button>
                                        <button
                                            onClick={nextReview}
                                            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:shadow-xl"
                                        >
                                            <ChevronRight
                                                size={20}
                                                className="text-gray-600"
                                            />
                                        </button>
                                    </>
                                )}
                                {/* Dots Indicator */}
                                {featuredReviews.length > 1 && (
                                    <div className="mt-6 flex justify-center">
                                        {featuredReviews.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setCurrentReview(index)
                                                }
                                                className={`mx-1 h-2 w-2 rounded-full transition-all ${
                                                    index === currentReview
                                                        ? 'bg-brand-primary'
                                                        : 'bg-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Desktop Grid */}
                            <div className="mx-auto hidden max-w-7xl gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
                                {featuredReviews
                                    .slice(0, 3)
                                    .map((review, index) => (
                                        <div
                                            key={review.id || index}
                                            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 shadow-md">
                                                    <User
                                                        size={24}
                                                        className="text-gray-600"
                                                    />
                                                </div>
                                                <div className="mb-4 flex justify-center">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={18}
                                                                className={`${
                                                                    i <
                                                                    review.rating
                                                                        ? 'fill-yellow-400 text-yellow-400'
                                                                        : 'text-gray-300'
                                                                } mx-0.5`}
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                                <blockquote className="mb-6 line-clamp-4 text-sm leading-relaxed text-gray-700 italic">
                                                    "{review.review}"
                                                </blockquote>
                                                <div className="mt-auto">
                                                    <div className="text-base font-semibold text-gray-900">
                                                        {review.name}
                                                    </div>
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        Verified Traveler
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-lg">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                <User size={32} className="text-gray-400" />
                            </div>
                            <p className="mb-4 text-lg text-gray-500">
                                No reviews yet. Be the first to share your
                                experience!
                            </p>
                            <p className="text-sm text-gray-400">
                                Help other travelers by sharing your safari
                                adventure
                            </p>
                        </div>
                    )}

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => setShowReviewModal(true)}
                            className="rounded-lg bg-brand-secondary px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-brand-secondary/90 hover:shadow-xl"
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
