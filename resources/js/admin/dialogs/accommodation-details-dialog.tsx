import { Button } from '@/components/ui/button';
import { X, Building2, MapPin, Star, ExternalLink, Edit, Trash2 } from 'lucide-react';

interface Accommodation {
    id: string;
    name: string;
    location: string;
    rating: number;
    description: string;
    website: string;
    image_url?: string;
}

interface AccommodationDetailsDialogProps {
    accommodation: Accommodation | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (accommodation: Accommodation) => void;
    onDelete?: (id: string) => void;
}

export default function AccommodationDetailsDialog({ 
    accommodation, 
    isOpen, 
    onClose, 
    onEdit, 
    onDelete 
}: AccommodationDetailsDialogProps) {
    if (!isOpen || !accommodation) return null;

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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Accommodation Details</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <Building2 size={24} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{accommodation.name}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <MapPin size={16} />
                                    {accommodation.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={16} className="fill-current text-yellow-500" />
                                    {accommodation.rating}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{accommodation.description}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</h4>
                            <a
                                href={accommodation.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            >
                                <ExternalLink size={16} />
                                {accommodation.website}
                            </a>
                        </div>

                        {accommodation.image_url && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</h4>
                                <img
                                    src={accommodation.image_url}
                                    alt={accommodation.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => onEdit?.(accommodation)}
                        >
                            <Edit size={16} className="mr-2" />
                            Edit
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => onDelete?.(accommodation.id)}
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