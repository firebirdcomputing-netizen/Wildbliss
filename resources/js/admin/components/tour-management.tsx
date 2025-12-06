import { Plus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface TourManagementProps {
    destinations: any[];
}

export default function TourManagement({ destinations }: TourManagementProps) {

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tour Management</h3>
                <Link href="/admin/destinations">
                    <Button className="flex items-center gap-2">
                        <Plus size={16} />
                        Add Tour
                    </Button>
                </Link>
            </div>

            <div className="space-y-3">
                {destinations.length === 0 ? (
                    <div className="text-center py-8">
                        <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No destinations available</p>
                    </div>
                ) : (
                    destinations.map((destination) => (
                        <div key={destination.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{destination.name}</h4>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    <span>{destination.duration}</span>
                                    <span>{destination.location}</span>
                                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                        {destination.category}
                                    </span>
                                    <span>★ {destination.rating}</span>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
