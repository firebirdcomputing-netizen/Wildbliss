import PublicLayout from '@/layouts/public-layout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Phone, Send, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        country: '',
        contactNumber: '',
        adults: '',
        children: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <PublicLayout>
            <Head title="Contact Us - WildBliss Tours">
                <meta name="description" content="Get in touch with WildBliss Tours for your safari adventure. Contact us for bookings, inquiries, and custom tour packages." />
            </Head>

            {/* Header Section */}
            <section className="bg-white py-16 border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-12">
                        <img src="/logo.png" alt="Wild Bliss Tours" className="h-16 w-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Physical Address</p>
                            <div className="text-gray-900">
                                <p className="font-medium">College House, 4th Floor,</p>
                                <p className="font-medium">Koinange Street, Nairobi</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Call Us</p>
                            <a href="tel:+254727370155" className="block font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors">
                                +254 724 777159
                            </a>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Us</p>
                            <a href="mailto:info@wildblisstours.com" className="block font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors">
                                info@wildblisstours.com
                            </a>
                            <div className="flex space-x-3 pt-2">
                                <a href="https://www.facebook.com/wildblisstours" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://x.com/WildBlissTours" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors">
                                    <Twitter size={20} />
                                </a>
                                <a href="https://www.instagram.com/wildbliss.tours/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                                <p className="text-gray-600 mb-8">Fill up the form below to tell us what you're looking for</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                                                placeholder="your@email.com"
                                                required
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                id="country"
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                                                placeholder="Your country"
                                                required
                                            />
                                            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                                Contact Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="contactNumber"
                                                value={data.contactNumber}
                                                onChange={(e) => setData('contactNumber', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                                                placeholder="+254 700 000 000"
                                                required
                                            />
                                            {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Adults *
                                            </label>
                                            <input
                                                type="number"
                                                id="adults"
                                                value={data.adults}
                                                onChange={(e) => setData('adults', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                                                placeholder="1"
                                                min="1"
                                                required
                                            />
                                            {errors.adults && <p className="mt-1 text-sm text-red-600">{errors.adults}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-2">
                                                Number of Children
                                            </label>
                                            <input
                                                type="number"
                                                id="children"
                                                value={data.children}
                                                onChange={(e) => setData('children', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                                                placeholder="0"
                                                min="0"
                                            />
                                            {errors.children && <p className="mt-1 text-sm text-red-600">{errors.children}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-gray-900"
                                            required
                                        >
                                            <option value="" className="text-gray-500">Select a subject</option>
                                            <option value="safari-inquiry">Safari Inquiry</option>
                                            <option value="booking-request">Booking Request</option>
                                            <option value="custom-tour">Custom Tour Package</option>
                                            <option value="group-booking">Group Booking</option>
                                            <option value="general-inquiry">General Inquiry</option>
                                        </select>
                                        {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none text-gray-900 placeholder-gray-500"
                                            placeholder="Tell us about your safari dreams and requirements..."
                                            required
                                        />
                                        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-brand-secondary hover:bg-brand-secondary-hover text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                    >
                                        {processing ? (
                                            <span>Sending...</span>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Features Sidebar */}
                        <div className="space-y-8">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <img src="/icons/bestprice.svg" alt="Best Price Guarantee" className="w-16 h-16" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <img src="/icons/easyandquick.svg" alt="Easy & Quick Booking" className="w-16 h-16" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy & Quick Booking</h3>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <img src="/icons/customer.svg" alt="Customer Care 24/7" className="w-16 h-16" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Care 24/7</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
