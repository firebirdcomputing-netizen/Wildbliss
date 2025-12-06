import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Award, Check, RefreshCw, Star, X, Grid3X3, List, Eye } from 'lucide-react';
import { useState } from 'react';
import ReviewDetailsDialog from '@/admin/dialogs/review-details-dialog';
import { useLayoutPreference } from '@/hooks/use-layout-preference';

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
    const { layoutMode, updateLayoutMode } = useLayoutPreference();
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const handleViewDetails = (review: Review) => {
        setSelectedReview(review);
        setShowDetailsDialog(true);
    };

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
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={refreshReviews}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </Button>
                        <Button
                            variant={
                                layoutMode === 'grid' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => updateLayoutMode('grid')}
                            className="flex items-center gap-2"
                        >
                            <Grid3X3 size={16} />
                            Grid
                        </Button>
                        <Button
                            variant={
                                layoutMode === 'table' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => updateLayoutMode('table')}
                            className="flex items-center gap-2"
                        >
                            <List size={16} />
                            Table
                        </Button>
                    </div>
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
                        ) : layoutMode === 'table' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-600">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Email</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Rating</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Review</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map((review) => (
                                            <tr 
                                                key={review.id} 
                                                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                                onClick={() => handleViewDetails(review)}
                                            >
                                                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{review.name}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{review.email}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                className={`${
                                                                    i < review.rating
                                                                        ? 'fill-yellow-400 text-yellow-400'
                                                                        : 'text-gray-300'
                                                                }`}
                                                            />
                                                        ))}
                                                        <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                                                            {review.rating}/5
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{review.review}</td>
                                                <td className="py-3 px-4">
                                                    {review.is_featured ? (
                                                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                                            <Award size={10} />
                                                            Featured
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewDetails(review);
                                                        }}
                                                    >
                                                        <Eye size={12} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="rounded-lg border border-gray-100 p-4 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => handleViewDetails(review)}
                                    >
                                        <div className="mb-3 flex items-start justify-between">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {review.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {review.email}
                                                </p>
                                            </div>
                                            {review.is_featured ? (
                                                <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    <Award size={10} />
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                    Pending
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <div className="mb-2 flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        className={`${
                                                            i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                                <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                                                    {review.rating}/5
                                                </span>
                                            </div>
                                            <p className="line-clamp-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                                {review.review}
                                            </p>
                                        </div>

                                        <div className="border-t border-gray-100 pt-3 dark:border-gray-600">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewDetails(review);
                                                }}
                                                className="w-full"
                                            >
                                                <Eye size={12} className="mr-1" />
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <ReviewDetailsDialog
                review={selectedReview}
                isOpen={showDetailsDialog}
                onClose={() => setShowDetailsDialog(false)}
                onUpdateReview={updateReview}
            />
        </AppLayout>
    );
}
