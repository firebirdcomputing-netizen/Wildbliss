import { router } from '@inertiajs/react';

export interface Destination {
    id: string;
    name: string;
    location: string;
    type: string;
    description?: string;
    info?: string;
    image?: string;
    rating: number;
    duration: string;
    group_size: string;
    category: string;
    tour?: string;
    status: string;
    tours_count: number;
}

export interface DestinationData {
    name: string;
    location: string;
    type: string;
    description?: string;
    info?: string;
    image?: string;
    rating: number;
    duration: string;
    group_size: string;
    category: string;
    tour?: string;
    status: string;
}

class ApiService {
    // Destinations
    createDestination(data: DestinationData, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.post('/admin/destinations', data, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    updateDestination(id: string, data: DestinationData, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.put(`/admin/destinations/${id}`, data, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    deleteDestination(id: string, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.delete(`/admin/destinations/${id}`, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    // Tours (placeholder for future implementation)
    createTour(data: any, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.post('/admin/tours', data, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    updateTour(id: number, data: any, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.put(`/admin/tours/${id}`, data, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    deleteTour(id: number, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.delete(`/admin/tours/${id}`, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    // Bookings (placeholder for future implementation)
    createBooking(data: any, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.post('/admin/bookings', data, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    updateBooking(id: number, data: any, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.put(`/admin/bookings/${id}`, data, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    deleteBooking(id: number, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.delete(`/admin/bookings/${id}`, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }

    // Messages
    updateMessageStatus(id: number, status: string, options?: { onSuccess?: () => void; onError?: (errors: any) => void }) {
        router.put(`/admin/messages/${id}`, { status }, {
            onSuccess: options?.onSuccess,
            onError: options?.onError,
        });
    }
}

export const apiService = new ApiService();
