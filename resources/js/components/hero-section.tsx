import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: 'Maasai Mara National Reserve',
            description: 'Witness the Great Migration and spot the Big Five',
            image: 'masai-mara',
        },
        {
            id: 2,
            title: 'Amboseli National Park',
            description: 'Elephants against Mount Kilimanjaro backdrop',
            image: 'amboseli',
        },
        {
            id: 3,
            title: 'Tsavo National Parks',
            description: "Kenya's largest wilderness area",
            image: 'tsavo',
        },
        {
            id: 4,
            title: 'Lake Nakuru National Park',
            description: 'Flamingo paradise and rhino sanctuary',
            image: 'nakuru',
        },
        {
            id: 5,
            title: 'Kibera Community Outreach',
            description:
                'Support local communities through meaningful charity work',
            image: 'kibera',
        },
        {
            id: 6,
            title: 'Tea Plantations',
            description: "Discover Kenya's world-renowned tea estates",
            image: 'tea-plantations',
        },
        {
            id: 7,
            title: 'Coffee Plantations',
            description: 'Experience the journey from bean to cup',
            image: 'coffee-plantations',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative min-h-screen text-white flex items-center overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/hero.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                    {/* Content */}
                    <div className="space-y-8">
                        <div>
                            <p className="text-brand-secondary text-lg font-medium mb-2">Best Wild Bliss Experience</p>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                                Wild Bliss Tours
                            </h1>
                        </div>

                        <p className="text-xl text-blue-100 leading-relaxed">
                            Embark on the ultimate Kenyan wild adventure with our expertly curated tour packages.
                            Experience breathtaking safaris, stunning landscapes, and thrilling excursions,
                            all tailored to create unforgettable memories.
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link
                                href="/tours"
                                className="inline-flex items-center bg-brand-secondary hover:bg-brand-secondary-hover text-white px-8 py-4 rounded-lg font-semibold space-x-2 transition-all hover:scale-105"
                            >
                                <span>Explore Our Packages</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={`/destinations/${slide.image}.jpg`}
                                            alt={slide.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-end">
                                            <div className="text-white p-8 w-full">
                                                <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                                                <p className="text-lg opacity-90">{slide.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        index === currentSlide
                                            ? 'bg-brand-secondary scale-125'
                                            : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">4.9</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Excellent Rating</p>
                                    <p className="text-sm text-gray-600">500+ Happy Travelers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
