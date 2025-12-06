import { Button } from '@/components/ui/button';
import { X, MapPin, Star, Calendar, Users, Edit, Trash2 } from 'lucide-react';
import { type Destination } from '@/services/api';

interface DestinationDetailsDialogProps {
    destination: Destination | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (destination: Destination) => void;
    onDelete?: (destination: Destination) => void;
}

export default function DestinationDetailsDialog({ 
    destination, 
    isOpen, 
    onClose, 
    onEdit, 
    onDelete 
}: DestinationDetailsDialogProps) {
    if (!isOpen || !destination) return null;

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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Destination Details</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    {destination.image_url && (
                        <div>
                            <img
                                src={destination.image_url}
                                alt={destination.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                            <MapPin size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{destination.name}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                <span>{destination.location}</span>
                                <span>•</span>
                                <span>{destination.type}</span>
                                {destination.rating && (
                                    <>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="fill-current text-yellow-500" />
                                            {destination.rating}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                            destination.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                            {destination.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {destination.duration && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Calendar size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{destination.duration}</p>
                                </div>
                            </div>
                        )}
                        {destination.group_size && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Users size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Group Size</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{destination.group_size}</p>
                                </div>
                            </div>
                        )}
                        {destination.category && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="w-5 h-5 bg-blue-500 rounded"></div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{destination.category}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {destination.description && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{destination.description}</p>
                                </div>
                            )}

                            {destination.info && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Information</h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{destination.info}</p>
                                </div>
                            )}
                        </div>
                        
                        {destination.tour && Array.isArray(destination.tour) && destination.tour.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tour Categories</h4>
                                <div className="space-y-2">
                                    {destination.tour.map((tourCategory) => (
                                        <span
                                            key={tourCategory}
                                            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                                        >
                                            {tourCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => onEdit?.(destination)}
                        >
                            <Edit size={16} className="mr-2" />
                            Edit
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => onDelete?.(destination)}
                        >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}