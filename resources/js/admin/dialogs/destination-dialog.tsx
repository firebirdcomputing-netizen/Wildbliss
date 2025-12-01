import { X, Upload, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    apiService,
    type Destination,
    type DestinationData,
} from '@/services/api';

interface Props {
    destination?: Destination;
    onClose: () => void;
}

export default function DestinationDialog({ destination, onClose }: Props) {
    const [currentStep, setCurrentStep] = useState(1);
    const { data, setData, processing, errors, reset, post, put } = useForm({
        name: destination?.name || '',
        location: destination?.location || '',
        type: destination?.type || '',
        description: destination?.description || '',
        info: destination?.info || '',
        image: null,
        rating: destination?.rating || 4.0,
        duration: destination?.duration || '',
        group_size: destination?.group_size || '',
        category: destination?.category || '',
        tour: destination?.tour || '',
        status: destination?.status || 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (destination) {
            put(`/admin/destinations/${destination.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/admin/destinations', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {destination ? 'Edit Destination' : 'Add New Destination'}
                        </h2>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-8 rounded-full ${currentStep >= 1 ? 'bg-brand-primary' : 'bg-gray-200'}`}></div>
                                <span className="text-sm text-gray-600">Basic Info</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-8 rounded-full ${currentStep >= 2 ? 'bg-brand-primary' : 'bg-gray-200'}`}></div>
                                <span className="text-sm text-gray-600">Details</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={24} />
                    </Button>
                </div>

                <div className="max-h-[calc(95vh-120px)] overflow-y-auto">
                    <div className="p-8">
                        {currentStep === 1 && (
                            <div className="space-y-8">
                                {/* Basic Information */}
                                <div className="space-y-6">
                                    <div className="border-l-4 border-brand-primary pl-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Essential details about the destination</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Destination Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="e.g., Masai Mara National Reserve"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Location *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="e.g., Kenya, East Africa"
                                                required
                                            />
                                            {errors.location && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Classification */}
                                <div className="space-y-6">
                                    <div className="border-l-4 border-brand-secondary pl-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Classification</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Categorize and classify the destination</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Destination Type *
                                            </label>
                                            <select
                                                value={data.type}
                                                onChange={(e) => setData('type', e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                required
                                            >
                                                <option value="">Choose type...</option>
                                                <option value="National Park">National Park</option>
                                                <option value="Game Reserve">Game Reserve</option>
                                                <option value="Conservancy">Conservancy</option>
                                                <option value="Beach">Beach</option>
                                                <option value="Mountain">Mountain</option>
                                                <option value="Lake">Lake</option>
                                                <option value="City">City</option>
                                            </select>
                                            {errors.type && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.type}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Category *
                                            </label>
                                            <select
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                required
                                            >
                                                <option value="">Select category</option>
                                                <option value="Wildlife">Wildlife</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Cultural">Cultural</option>
                                                <option value="Beach">Beach</option>
                                            </select>
                                            {errors.category && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.category}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Tour Category
                                            </label>
                                            <select
                                                value={data.tour}
                                                onChange={(e) => setData('tour', e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">Select tour</option>
                                                <option value="4x4-safaris">4X4 Safaris</option>
                                                <option value="day-tours">Day Tours</option>
                                                <option value="kenya-camping-safaris">Kenya Camping Safaris</option>
                                                <option value="kenya-tanzania-safaris">Kenya - Tanzania Safaris</option>
                                                <option value="kenya-wildlife-safaris">Kenya Wildlife Safaris</option>
                                                <option value="mountain-climbing">Mountain Climbing</option>
                                                <option value="tanzania-wildlife-safaris">Tanzania Wildlife Safaris</option>
                                            </select>
                                            {errors.tour && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.tour}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tour Details */}
                                <div className="space-y-6">
                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tour Details</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Pricing and group information</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Rating *
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                value={data.rating}
                                                onChange={(e) => setData('rating', parseFloat(e.target.value))}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="4.5"
                                                required
                                            />
                                            {errors.rating && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.rating}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Duration *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="2-4 days"
                                                required
                                            />
                                            {errors.duration && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.duration}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Group Size *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.group_size}
                                                onChange={(e) => setData('group_size', e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="2-10 people"
                                                required
                                            />
                                            {errors.group_size && (
                                                <p className="mt-2 flex items-center text-sm text-red-600">
                                                    <span className="mr-1">⚠</span> {errors.group_size}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {currentStep === 2 && (
                            <div className="space-y-8">
                                {/* Image Upload */}
                                <div className="space-y-6">
                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Media</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Upload destination image</p>
                                    </div>
                                    
                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Destination Image
                                        </label>
                                        <div className="space-y-4">
                                            <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                                                <Upload size={24} />
                                                <div className="text-center">
                                                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        Click to upload image
                                                    </span>
                                                    <span className="text-xs text-gray-500">PNG, JPG up to 2MB</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setData('image', file);
                                                        }
                                                    }}
                                                />
                                            </label>
                                            {(data.image || destination?.image_url) && (
                                                <div className="relative">
                                                    <img
                                                        src={
                                                            data.image
                                                                ? URL.createObjectURL(data.image)
                                                                : destination?.image_url || ''
                                                        }
                                                        alt="Preview"
                                                        className="h-48 w-full rounded-xl border border-gray-200 object-cover dark:border-gray-600"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {errors.image && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <span className="mr-1">⚠</span> {errors.image}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-6">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Detailed description and information</p>
                                    </div>
                                    
                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Description
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            rows={4}
                                            placeholder="Brief description of the destination..."
                                        />
                                        {errors.description && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <span className="mr-1">⚠</span> {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Additional Information
                                        </label>
                                        <textarea
                                            value={data.info}
                                            onChange={(e) => setData('info', e.target.value)}
                                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            rows={6}
                                            placeholder="Detailed information about activities, wildlife, best time to visit..."
                                        />
                                        {errors.info && (
                                            <p className="mt-2 flex items-center text-sm text-red-600">
                                                <span className="mr-1">⚠</span> {errors.info}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                            <div>
                                {currentStep === 2 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setCurrentStep(1)}
                                        className="flex items-center gap-2"
                                    >
                                        <ChevronLeft size={16} />
                                        Back
                                    </Button>
                                )}
                            </div>
                            
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                
                                {currentStep === 1 ? (
                                    <Button
                                        type="button"
                                        onClick={() => setCurrentStep(2)}
                                        className="flex items-center gap-2 bg-brand-primary text-white hover:bg-brand-primary/90"
                                    >
                                        Next
                                        <ChevronRight size={16} />
                                    </Button>
                                ) : (
                                    <form onSubmit={handleSubmit} className="inline">
                                        <Button 
                                            type="submit" 
                                            disabled={processing}
                                            className="bg-brand-primary text-white hover:bg-brand-primary/90"
                                        >
                                            {processing ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                    {destination ? 'Updating...' : 'Creating...'}
                                                </div>
                                            ) : (
                                                <>{destination ? 'Update Destination' : 'Create Destination'}</>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}