import { Button } from '@/components/ui/button';
import { X, Star, Award, Check, Mail, Calendar } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    email: string;
    rating: number;
    review: string;
    is_featured: boolean;
    created_at: string;
}

interface ReviewDetailsDialogProps {
    review: Review | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdateReview?: (id: number, featured: boolean) => void;
}

export default function ReviewDetailsDialog({ review, isOpen, onClose, onUpdateReview }: ReviewDetailsDialogProps) {
    if (!isOpen || !review) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Review Details</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                            <Star size={24} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                <Mail size={14} />
                                {review.email}
                            </p>
                        </div>
                        {review.is_featured ? (
                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                <Award size={14} />
                                Featured
                            </span>
                        ) : (
                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Pending
                            </span>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</h4>
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={`${
                                            i < review.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                                <span className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                                    {review.rating}/5
                                </span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Review</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{review.review}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar size={16} />
                            Submitted on {new Date(review.created_at).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {review.is_featured ? (
                            <Button 
                                variant="outline" 
                                className="flex-1 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400"
                                onClick={() => onUpdateReview?.(review.id, false)}
                            >
                                <X size={16} className="mr-2" />
                                Remove from Featured
                            </Button>
                        ) : (
                            <Button 
                                className="flex-1 bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                                onClick={() => onUpdateReview?.(review.id, true)}
                            >
                                <Check size={16} className="mr-2" />
                                Feature Review
                            </Button>
                        )}
                        <Button variant="outline" className="flex-1">
                            <Mail size={16} className="mr-2" />
                            Contact Reviewer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}