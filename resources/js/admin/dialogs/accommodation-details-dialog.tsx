import { Button } from '@/components/ui/button';
import { X, Building2, MapPin, Star, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import ConfirmationDialog from '@/admin/dialogs/confirmation-dialog';

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
}

export default function AccommodationDetailsDialog({
    accommodation,
    isOpen,
    onClose,
}: AccommodationDetailsDialogProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        rating: 0,
        description: '',
        website: '',
        image_url: '',
    });

    const handleEdit = () => {
        if (!accommodation) return;
        setFormData({
            name: accommodation.name,
            location: accommodation.location,
            rating: accommodation.rating,
            description: accommodation.description,
            website: accommodation.website,
            image_url: accommodation.image_url || '',
        });
        setIsEditing(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!accommodation) return;

        router.put(`/admin/accommodations/${accommodation.id}`, formData, {
            onSuccess: () => {
                setIsEditing(false);
                onClose();
            },
        });
    };

    const handleDelete = () => {
        if (!accommodation) return;
        router.delete(`/admin/accommodations/${accommodation.id}`, {
            onSuccess: () => onClose(),
        });
    };

    if (!isOpen || !accommodation) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Accommodation Details
                    </h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="space-y-6 p-6">
                    {isEditing ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            rating: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            website: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.image_url}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            image_url: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" className="flex-1">
                                    Save Changes
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                    <Building2
                                        size={24}
                                        className="text-blue-600 dark:text-blue-400"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {accommodation.name}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            {accommodation.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star
                                                size={16}
                                                className="fill-current text-yellow-500"
                                            />
                                            {accommodation.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </h4>
                                    <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                                        {accommodation.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Website
                                    </h4>
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
                                        <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Image
                                        </h4>
                                        <img
                                            src={accommodation.image_url}
                                            alt={accommodation.name}
                                            className="h-48 w-full rounded-lg object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleEdit}
                                >
                                    <Edit size={16} className="mr-2" />
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            {showDeleteConfirm && (
                <ConfirmationDialog
                    title="Delete Accommodation"
                    message={`Are you sure you want to delete "${accommodation?.name}"? This action cannot be undone.`}
                    confirmText="Delete"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                    variant="danger"
                />
            )}
        </div>
    );
}
