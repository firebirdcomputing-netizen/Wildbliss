import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Check, X } from 'lucide-react';

interface Accommodation {
    id: string;
    name: string;
    location: string;
    rating: number;
    description: string;
    website: string;
    image_url?: string;
}

interface AccommodationSelectorProps {
    selectedAccommodations: string[];
    onSelectionChange: (accommodations: string[]) => void;
}

export default function AccommodationSelector({ 
    selectedAccommodations, 
    onSelectionChange 
}: AccommodationSelectorProps) {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch accommodations from API
        fetch('/api/accommodations')
            .then(res => res.json())
            .then(data => {
                setAccommodations(data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const toggleAccommodation = (accommodationId: string) => {
        const isSelected = selectedAccommodations.includes(accommodationId);
        if (isSelected) {
            onSelectionChange(selectedAccommodations.filter(id => id !== accommodationId));
        } else {
            onSelectionChange([...selectedAccommodations, accommodationId]);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-primary border-t-transparent"></div>
            </div>
        );
    }

    if (accommodations.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Building2 size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">No accommodations available</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Add accommodations first to select them for destinations</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {accommodations.map((accommodation) => {
                    const isSelected = selectedAccommodations.includes(accommodation.id);
                    return (
                        <div
                            key={accommodation.id}
                            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                                isSelected
                                    ? 'border-brand-primary bg-brand-primary/5'
                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                            }`}
                            onClick={() => toggleAccommodation(accommodation.id)}
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Building2 size={16} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                        {accommodation.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {accommodation.location}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-xs text-yellow-600">★</span>
                                        <span className="text-xs text-gray-500">{accommodation.rating}</span>
                                    </div>
                                </div>
                                <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                                    isSelected 
                                        ? 'bg-brand-primary border-brand-primary' 
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                    {isSelected && <Check size={12} className="text-white" />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {selectedAccommodations.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        {selectedAccommodations.length} accommodation{selectedAccommodations.length !== 1 ? 's' : ''} selected
                    </p>
                </div>
            )}
        </div>
    );
}