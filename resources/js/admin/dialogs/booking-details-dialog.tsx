import { Button } from '@/components/ui/button';
import { X, Trash2, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import ConfirmationDialog from '@/admin/dialogs/confirmation-dialog';

interface Booking {
    id: string;
    destination_id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    travel_date: string;
    group_size: number;
    special_requests?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

interface Destination {
    id: string;
    name: string;
    location: string;
    description: string;
    category: string;
    rating: number;
    duration: string;
    group_size: string;
    type: string;
    image_url?: string;
}

interface BookingDetailsDialogProps {
    booking: Booking | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingDetailsDialog({ booking, isOpen, onClose }: BookingDetailsDialogProps) {
    const [status, setStatus] = useState(booking?.status || 'pending');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [activeTab, setActiveTab] = useState<'booking' | 'destination'>('booking');
    const [destination, setDestination] = useState<Destination | null>(null);

    useEffect(() => {
        if (booking) {
            setStatus(booking.status);
            fetchDestination(booking.destination_id);
        }
    }, [booking]);

    const fetchDestination = async (destinationId: string) => {
        try {
            const response = await fetch('/api/destinations');
            const destinations = await response.json();
            const found = destinations.find((d: Destination) => d.id === destinationId);
            setDestination(found || null);
        } catch (error) {
            console.error('Failed to fetch destination:', error);
        }
    };

    if (!isOpen || !booking) return null;

    const handleStatusUpdate = () => {
        router.put(`/admin/bookings/${booking.id}`, { status });
    };

    const handleDelete = () => {
        router.delete(`/admin/bookings/${booking.id}`);
        onClose();
    };

    const handleEmail = () => {
        window.open(`mailto:${booking.email}?subject=Regarding your booking #${booking.id}`);
    };

    const handleWhatsApp = () => {
        const message = `Hello ${booking.name}, regarding your booking #${booking.id}`;
        window.open(`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`);
    };

    const handleCall = () => {
        window.open(`tel:${booking.phone}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setActiveTab('booking')}
                            className={`text-xl font-bold pb-2 border-b-2 transition-colors ${
                                activeTab === 'booking'
                                    ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                    : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            Booking Details
                        </button>
                        <button
                            onClick={() => setActiveTab('destination')}
                            className={`text-xl font-bold pb-2 border-b-2 transition-colors ${
                                activeTab === 'destination'
                                    ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                                    : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            Destination
                        </button>
                    </div>
                    <Button variant="outline" size="sm" onClick={onClose}>
                        <X size={16} />
                    </Button>
                </div>

                {activeTab === 'booking' ? (
                    <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Booking ID</label>
                            <p className="text-gray-900 dark:text-white">#{booking.id}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <div className="flex items-center gap-2">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as 'pending' | 'confirmed' | 'cancelled')}
                                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {status !== booking.status && (
                                    <Button size="sm" onClick={handleStatusUpdate}>
                                        Update
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <p className="text-gray-900 dark:text-white">{booking.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <p className="text-gray-900 dark:text-white">{booking.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                            <p className="text-gray-900 dark:text-white">{booking.phone}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                            <p className="text-gray-900 dark:text-white">{booking.country}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel Date</label>
                            <p className="text-gray-900 dark:text-white">{new Date(booking.travel_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Group Size</label>
                            <p className="text-gray-900 dark:text-white">{booking.group_size} {booking.group_size === 1 ? 'person' : 'people'}</p>
                        </div>
                    </div>
                    {booking.special_requests && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requests</label>
                            <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">{booking.special_requests}</p>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created At</label>
                        <p className="text-gray-900 dark:text-white">{new Date(booking.created_at).toLocaleString()}</p>
                    </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {destination ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination Name</label>
                                        <p className="text-gray-900 dark:text-white font-semibold">{destination.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-gray-500" />
                                            <p className="text-gray-900 dark:text-white">{destination.location}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                        <p className="text-gray-900 dark:text-white">{destination.category}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                                        <p className="text-gray-900 dark:text-white">{destination.rating} ⭐</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                                        <p className="text-gray-900 dark:text-white">{destination.duration}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Group Size</label>
                                        <p className="text-gray-900 dark:text-white">{destination.group_size}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">{destination.description}</p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400">Loading destination details...</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'booking' && (
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-6">
                        <div className="flex flex-wrap gap-3">
                            <Button onClick={handleEmail} variant="outline" className="flex items-center gap-2">
                                <Mail size={16} />
                                Email
                            </Button>
                            <Button onClick={handleWhatsApp} variant="outline" className="flex items-center gap-2">
                                <MessageCircle size={16} />
                                WhatsApp
                            </Button>
                            <Button onClick={handleCall} variant="outline" className="flex items-center gap-2">
                                <Phone size={16} />
                                Call
                            </Button>
                            <Button onClick={() => setShowDeleteConfirm(true)} variant="destructive" className="flex items-center gap-2 ml-auto">
                                <Trash2 size={16} />
                                Delete
                            </Button>
                        </div>
                    </div>
                )}

                {showDeleteConfirm && (
                    <ConfirmationDialog
                        title="Delete Booking"
                        message={`Are you sure you want to delete booking #${booking.id} for ${booking.name}? This action cannot be undone.`}
                        confirmText="Delete"
                        cancelText="Cancel"
                        variant="danger"
                        onConfirm={handleDelete}
                        onCancel={() => setShowDeleteConfirm(false)}
                    />
                )}
            </div>
        </div>
    );
}
