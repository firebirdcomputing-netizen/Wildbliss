import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Users, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { type Destination } from '@/services/api';
import BookingDialog from '@/components/dialogs/booking-dialog';
import AccommodationsSection from '@/components/accommodations-section';
import RelatedDestinations from '@/components/related-destinations';

interface DestinationDetailsProps {
    destination: {
        id: string;
    };
}

export default function DestinationDetails({
    destination: destinationProp,
}: DestinationDetailsProps) {
    const [destination, setDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);
    const [showBookingDialog, setShowBookingDialog] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        fetchDestination();
    }, [destinationProp.id]);

    const fetchDestination = async () => {
        try {
            const response = await fetch('/api/destinations');
            const destinations = await response.json();
            const found = destinations.find(
                (d: Destination) => d.id === destinationProp.id,
            );
            setDestination(found || null);
        } catch (error) {
            console.error('Failed to fetch destination:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PublicLayout>
                <Head title="Loading... - WildBliss Tours" />
                <div className="flex min-h-screen items-center justify-center bg-gray-50">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-brand-primary"></div>
                </div>
            </PublicLayout>
        );
    }

    if (!destination) {
        return (
            <PublicLayout>
                <Head title="Destination Not Found - WildBliss Tours" />
                <div className="flex min-h-screen items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h1 className="mb-4 text-2xl font-bold text-gray-900">
                            Destination Not Found
                        </h1>
                        <Link
                            href="/"
                            className="text-brand-primary hover:underline"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title={`${destination.name} - WildBliss Tours`} />

            {/* Hero Section */}
            <div className="relative max-h-[80vh] min-h-[500px] overflow-hidden bg-gray-900">
                {destination.image_url ? (
                    <>
                        <img
                            src={destination.image_url}
                            alt={destination.name}
                            className="h-full w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary" />
                )}

                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                        <Link
                            href="/"
                            className="mb-6 inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm font-medium">
                                Back to Destinations
                            </span>
                        </Link>

                        <div className="max-w-4xl">
                            <div className="mb-4">
                                <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                                    {destination.category}
                                </span>
                            </div>

                            <h1 className="mb-6 text-4xl leading-tight font-bold text-white md:text-6xl">
                                {destination.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} />
                                    <span className="text-lg font-medium">
                                        {destination.location}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star
                                        size={20}
                                        className="fill-current text-yellow-400"
                                    />
                                    <span className="text-lg font-medium">
                                        {destination.rating}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={20} />
                                    <span className="text-lg font-medium">
                                        {destination.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-8 lg:col-span-2">
                            <div>
                                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                    About This Destination
                                </h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="leading-relaxed whitespace-pre-line text-gray-600">
                                        {destination.description}
                                    </p>
                                </div>
                            </div>

                            {destination.info && (
                                <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                        Tour Details & Information
                                    </h3>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="leading-relaxed whitespace-pre-line text-gray-700">
                                            {destination.info}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <AccommodationsSection destinationId={destination.id.toString()} />
                            
                            {/* Related Destinations */}
                            <RelatedDestinations currentDestination={destination} />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                                <h3 className="mb-6 text-2xl font-bold text-gray-900">
                                    Quick Info
                                </h3>

                                <div className="mb-8 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-brand-primary/10 p-3">
                                            <Clock
                                                className="text-brand-primary"
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                                Duration
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {destination.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-brand-primary/10 p-3">
                                            <Users
                                                className="text-brand-primary"
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                                Group Size
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {destination.group_size}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-brand-primary/10 p-3">
                                            <MapPin
                                                className="text-brand-primary"
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                                Type
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {destination.type}
                                            </p>
                                        </div>
                                    </div>
                                    {destination.tour && (
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-full bg-brand-primary/10 p-3">
                                                <Calendar
                                                    className="text-brand-primary"
                                                    size={20}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                                    Tour Categories
                                                </p>
                                                <div className="space-y-1">
                                                    {Array.isArray(destination.tour) ? (
                                                        destination.tour.map((tourCategory, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-block bg-brand-primary/10 text-brand-primary px-2 py-1 rounded text-sm font-medium mr-1 mb-1"
                                                            >
                                                                {tourCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <p className="text-lg font-semibold text-gray-900 capitalize">
                                                            {destination.tour.replace(/-/g, ' ')}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="mb-4 text-lg font-bold text-gray-900">
                                        Ready to Book?
                                    </h4>
                                    <div className="space-y-4">
                                        <a
                                            href="tel:+254727370155"
                                            className="flex items-center gap-3 rounded-lg bg-brand-primary/5 p-3 text-brand-primary transition-colors hover:bg-brand-primary/10"
                                        >
                                            <Phone size={18} />
                                            <span className="font-medium">
                                                +254 727 370 155
                                            </span>
                                        </a>
                                        <a
                                            href="mailto:info@wildblisstoursandsafaris.com"
                                            className="flex items-center gap-3 rounded-lg bg-brand-primary/5 p-3 text-brand-primary transition-colors hover:bg-brand-primary/10"
                                        >
                                            <Mail size={18} />
                                            <span className="font-medium">
                                                info@wildblisstoursandsafaris.com
                                            </span>
                                        </a>

                                        <div className="mt-6 border-t border-gray-200 pt-4">
                                            <button
                                                onClick={() =>
                                                    setShowBookingDialog(true)
                                                }
                                                className="w-full rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/90"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showSuccessMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setShowSuccessMessage(false)}
                    />
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
                        <div className="mb-4 text-green-500">
                            <svg
                                className="mx-auto h-16 w-16"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                            Booking Submitted!
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Thank you for your booking request. We'll contact
                            you within 24 hours to confirm your safari
                            adventure.
                        </p>
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="w-full rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/90"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {destination && (
                <BookingDialog
                    isOpen={showBookingDialog}
                    onClose={() => setShowBookingDialog(false)}
                    onSuccess={() => {
                        setShowBookingDialog(false);
                        setShowSuccessMessage(true);
                    }}
                    destination={destination}
                />
            )}
        </PublicLayout>
    );
}
