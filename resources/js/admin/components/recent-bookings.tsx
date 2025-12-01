import { Eye, Calendar } from 'lucide-react';

interface RecentBookingsProps {
    bookings: any[];
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
                <button className="text-sm text-primary hover:text-primary/80">View All</button>
            </div>
            
            <div className="space-y-4">
                {bookings.length === 0 ? (
                    <div className="text-center py-8">
                        <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No recent bookings</p>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{booking.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{booking.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span>{new Date(booking.travel_date).toLocaleDateString()}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                        booking.status === 'confirmed' 
                                            ? 'bg-green-100 text-green-800' 
                                            : booking.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">{booking.group_size} people</span>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                                    <Eye size={16} className="text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}