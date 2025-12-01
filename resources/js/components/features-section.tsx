import {
    Backpack,
    Building,
    ChevronLeft,
    ChevronRight,
    Trees,
    Users,
    Waves,
} from 'lucide-react';
import { useState } from 'react';

export default function FeaturesSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const tours = [
        {
            icon: Trees,
            title: 'Wildlife Tours',
            description:
                "Experience the thrill of the wild with close-up animal encounters, and stunning landscapes teeming with diverse wildlife. Whether it's the Big Five, rare species, or birdwatching, these tours offer unforgettable moments in nature.",
        },
        {
            icon: Backpack,
            title: 'Adventure Tours',
            description:
                'For thrill-seekers and nature lovers, these adventure tours offer adrenaline-packed experiences across breathtaking landscapes. From towering mountains to wild rivers and vast deserts, embark on an unforgettable journey!',
        },
        {
            icon: Users,
            title: 'Cultural Tours',
            description:
                'Immerse yourself in vibrant traditions, indigenous lifestyles, and rich heritage with these unforgettable cultural experiences. From ancient tribal customs to Swahili coastal influences, explore the diverse cultures that shape history.',
        },
        {
            icon: Building,
            title: 'Museum Tours',
            description:
                'Discover rich history, culture, and heritage through fascinating museum experiences. From prehistoric discoveries to colonial history and indigenous traditions, these tours offer deep insights into the past.',
        },
        {
            icon: Waves,
            title: 'Beaches Tour',
            description:
                "Experience breathtaking white sandy beaches, crystal-clear waters, and thrilling water adventures. Whether you seek relaxation, cultural exploration, or adrenaline-pumping activities, there's a perfect beach getaway for you",
        },
    ];

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Explore Our Tour Categories
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Discover diverse experiences tailored to your adventure
                        style, from wildlife safaris to cultural immersions.
                    </p>
                </div>

                {/* Desktop Grid */}
                <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-5">
                    {tours.map((tour, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-brand-secondary hover:shadow-xl"
                        >
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                                <tour.icon
                                    className="text-brand-secondary transition-all duration-300 group-hover:scale-110 group-hover:text-white"
                                    size={40}
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-white">
                                {tour.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                {tour.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="relative md:hidden">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                            }}
                        >
                            {tours.map((tour, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className="group cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-gray-800 transition-all duration-300 hover:bg-brand-secondary hover:shadow-xl">
                                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                                            <tour.icon
                                                className="text-brand-secondary transition-all duration-300 group-hover:text-white"
                                                size={40}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <h3 className="mb-4 text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-white">
                                            {tour.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                            {tour.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() =>
                            setCurrentSlide(
                                currentSlide > 0
                                    ? currentSlide - 1
                                    : tours.length - 1,
                            )
                        }
                        className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
                    >
                        <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <button
                        onClick={() =>
                            setCurrentSlide(
                                currentSlide < tours.length - 1
                                    ? currentSlide + 1
                                    : 0,
                            )
                        }
                        className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
                    >
                        <ChevronRight size={20} className="text-gray-600" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="mt-6 flex justify-center space-x-2">
                        {tours.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 w-2 rounded-full transition-colors ${
                                    currentSlide === index
                                        ? 'bg-brand-primary'
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
