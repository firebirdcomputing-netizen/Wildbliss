import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Calendar, Users, Mail, Phone, User, Globe } from 'lucide-react';

interface BookingDialogProps {
    isOpen: boolean;
    onClose: () => void;
    destination: {
        id: string;
        name: string;
    };
}

export default function BookingDialog({ isOpen, onClose, destination }: BookingDialogProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        destination_id: destination.id,
        name: '',
        email: '',
        phone: '',
        country: '',
        travel_date: '',
        group_size: 1,
        special_requests: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/bookings', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-8">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Safari</h2>
                                <p className="text-gray-600 text-lg">{destination.name}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                                        <User size={18} className="mr-2 text-brand-primary" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                                        <Mail size={18} className="mr-2 text-brand-primary" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                                        <Phone size={18} className="mr-2 text-brand-primary" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+254 700 000 000"
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                                        <Globe size={18} className="mr-2 text-brand-primary" />
                                        Country
                                    </label>
                                    <select
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 bg-white"
                                        required
                                    >
                                        <option value="">Select your country</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Tanzania">Tanzania</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="United States">United States</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.country && <p className="text-red-500 text-sm mt-2">{errors.country}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                                        <Calendar size={18} className="mr-2 text-brand-primary" />
                                        Preferred Travel Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.travel_date}
                                        onChange={(e) => setData('travel_date', e.target.value)}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900"
                                        required
                                    />
                                    {errors.travel_date && <p className="text-red-500 text-sm mt-2">{errors.travel_date}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                                        <Users size={18} className="mr-2 text-brand-primary" />
                                        Group Size
                                    </label>
                                    <select
                                        value={data.group_size}
                                        onChange={(e) => setData('group_size', parseInt(e.target.value))}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 bg-white"
                                        required
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                        ))}
                                    </select>
                                    {errors.group_size && <p className="text-red-500 text-sm mt-2">{errors.group_size}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-3">
                                    Special Requests (Optional)
                                </label>
                                <textarea
                                    value={data.special_requests}
                                    onChange={(e) => setData('special_requests', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
                                    placeholder="Tell us about any dietary requirements, accessibility needs, or special occasions..."
                                />
                                {errors.special_requests && <p className="text-red-500 text-sm mt-2">{errors.special_requests}</p>}
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-6 py-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl"
                                >
                                    {processing ? 'Submitting...' : 'Submit Booking'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
