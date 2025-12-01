import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Star, MessageSquare } from 'lucide-react';

interface ReviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReviewDialog({ isOpen, onClose }: ReviewDialogProps) {
    const [hoveredRating, setHoveredRating] = useState(0);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        rating: 0,
        review: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reviews', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
                
                <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full">
                    <div className="p-8">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
                                <p className="text-gray-600">Help others discover the magic of East Africa</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-3">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-3">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-3">
                                    How would you rate your experience?
                                </label>
                                <div className="flex gap-2 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setData('rating', star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="p-2 transition-all duration-200 hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={`${
                                                    star <= (hoveredRating || data.rating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300 hover:text-gray-400'
                                                } transition-colors duration-200`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {data.rating === 0 ? 'Click to rate' : 
                                     data.rating === 1 ? 'Poor' :
                                     data.rating === 2 ? 'Fair' :
                                     data.rating === 3 ? 'Good' :
                                     data.rating === 4 ? 'Very Good' : 'Excellent'}
                                </p>
                                {errors.rating && <p className="text-red-500 text-sm mt-2">{errors.rating}</p>}
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                                    <MessageSquare size={18} className="mr-2 text-brand-primary" />
                                    Tell us about your experience
                                </label>
                                <textarea
                                    value={data.review}
                                    onChange={(e) => setData('review', e.target.value)}
                                    rows={5}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 resize-none text-gray-900 placeholder:text-gray-400"
                                    placeholder="Share the highlights of your safari adventure, what made it special, and what you'd recommend to other travelers..."
                                    required
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500">Your review helps other travelers plan their perfect safari</p>
                                    <p className="text-xs text-gray-400">{data.review.length}/1000</p>
                                </div>
                                {errors.review && <p className="text-red-500 text-sm mt-2">{errors.review}</p>}
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || data.rating === 0}
                                    className="flex-1 px-6 py-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}