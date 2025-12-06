import { Button } from '@/components/ui/button';
import { X, User, Mail, Phone, Globe, Calendar, MapPin } from 'lucide-react';

interface Customer {
    name: string;
    email: string;
    phone: string;
    country: string;
    bookings_count: number;
    first_booking: string;
}

interface CustomerDetailsDialogProps {
    customer: Customer | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CustomerDetailsDialog({ customer, isOpen, onClose }: CustomerDetailsDialogProps) {
    if (!isOpen || !customer) return null;

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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Customer Details</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                            <User size={24} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Customer since {new Date(customer.first_booking).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Mail size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Phone size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Globe size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Country</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.country}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Calendar size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Bookings</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{customer.bookings_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button className="flex-1">
                            <Mail size={16} className="mr-2" />
                            Send Email
                        </Button>
                        <Button variant="outline" className="flex-1">
                            <Phone size={16} className="mr-2" />
                            Call Customer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}