import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Award, Check, RefreshCw, Star, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Reviews', href: '/admin/reviews' },
];

interface Review {
    id: string;
    name: string;
    email: string;
    rating: number;
    review: string;
    is_featured: boolean;
    created_at: string;
}

interface ReviewsProps {
    reviews: Review[];
}

export default function Reviews({ reviews = [] }: ReviewsProps) {
    // Debug log to check if reviews are being passed
    console.log('Reviews data:', reviews);

    const updateReview = (reviewId: string, isFeatured: boolean) => {
        router.put(
            `/admin/reviews/${reviewId}`,
            { is_featured: isFeatured },
            {
                preserveScroll: true,
            },
        );
    };

    const refreshReviews = () => {
        router.get('/admin/reviews');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reviews - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Reviews
                    </h1>
                    <Button
                        onClick={refreshReviews}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </Button>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="p-6">
                        {!reviews || reviews.length === 0 ? (
                            <div className="py-12 text-center">
                                <Star
                                    size={48}
                                    className="mx-auto mb-4 text-gray-400"
                                />
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                    No reviews yet
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Reviews will appear here once customers
                                    start submitting them.
                                </p>
                                {/* Add test button to check if buttons work */}
                                <Button
                                    onClick={() =>
                                        console.log('Test button clicked')
                                    }
                                    className="mt-4"
                                >
                                    Test Button
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="rounded-lg border border-gray-100 p-6 dark:border-gray-600"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {review.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {review.email}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {new Date(
                                                            review.created_at,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {review.is_featured ? (
                                                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        <Award size={12} />
                                                        Featured
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="mb-2 flex items-center gap-1">
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
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {review.rating}/5
                                                </span>
                                            </div>
                                            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                                {review.review}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-600">
                                            <div className="flex items-center gap-2">
                                                {review.is_featured ? (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            updateReview(
                                                                review.id,
                                                                false,
                                                            )
                                                        }
                                                        className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400"
                                                    >
                                                        <X
                                                            size={14}
                                                            className="mr-1"
                                                        />
                                                        Remove Featured
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            updateReview(
                                                                review.id,
                                                                true,
                                                            )
                                                        }
                                                        className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                                                    >
                                                        <Check
                                                            size={14}
                                                            className="mr-1"
                                                        />
                                                        Approve & Feature
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
