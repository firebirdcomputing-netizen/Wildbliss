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
                <meta
                    name="description"
                    content="Get in touch with WildBliss Tours for your safari adventure. Contact us for bookings, inquiries, and custom tour packages."
                />
            </Head>

            {/* Header Section */}
            <section className="border-b border-gray-100 bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="mb-12 flex justify-center">
                        <img
                            src="/logo.png"
                            alt="Wild Bliss Tours"
                            className="h-16 w-auto"
                        />
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-4">
                        <div>
                            <h1 className="mb-2 text-4xl font-bold text-gray-900">
                                Contact Us
                            </h1>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                Physical Address
                            </p>
                            <div className="text-gray-900">
                                <p className="font-medium">
                                    College House, 4th Floor,
                                </p>
                                <p className="font-medium">
                                    Koinange Street, Nairobi
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                Call Us
                            </p>
                            <a
                                href="tel:+254 724 777159"
                                className="block font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover"
                            >
                                +254 724 777159
                            </a>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                Email Us
                            </p>
                            <a
                                href="mailto:info@wildblisstoursandsafaris.com"
                                className="block font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover"
                            >
                                info@wildblisstoursandsafaris.com
                            </a>
                            <div className="flex space-x-3 pt-2">
                                <a
                                    href="https://www.facebook.com/wildblisstours"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors hover:text-brand-primary"
                                >
                                    <Facebook size={20} />
                                </a>
                                <a
                                    href="https://x.com/WildBlissTours"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors hover:text-brand-primary"
                                >
                                    <Twitter size={20} />
                                </a>
                                <a
                                    href="https://www.instagram.com/wildbliss.tours/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 transition-colors hover:text-brand-primary"
                                >
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                    Send us a Message
                                </h2>
                                <p className="mb-8 text-gray-600">
                                    Fill up the form below to tell us what
                                    you're looking for
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                                placeholder="your@email.com"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="country"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                id="country"
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        'country',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                                placeholder="Your country"
                                                required
                                            />
                                            {errors.country && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.country}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="contactNumber"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Contact Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="contactNumber"
                                                value={data.contactNumber}
                                                onChange={(e) =>
                                                    setData(
                                                        'contactNumber',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                                placeholder="+254 700 000 000"
                                                required
                                            />
                                            {errors.contactNumber && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.contactNumber}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="adults"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Number of Adults *
                                            </label>
                                            <input
                                                type="number"
                                                id="adults"
                                                value={data.adults}
                                                onChange={(e) =>
                                                    setData(
                                                        'adults',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                                placeholder="1"
                                                min="1"
                                                required
                                            />
                                            {errors.adults && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.adults}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="children"
                                                className="mb-2 block text-sm font-medium text-gray-700"
                                            >
                                                Number of Children
                                            </label>
                                            <input
                                                type="number"
                                                id="children"
                                                value={data.children}
                                                onChange={(e) =>
                                                    setData(
                                                        'children',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                                placeholder="0"
                                                min="0"
                                            />
                                            {errors.children && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.children}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    'subject',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                            required
                                        >
                                            <option
                                                value=""
                                                className="text-gray-500"
                                            >
                                                Select a subject
                                            </option>
                                            <option value="safari-inquiry">
                                                Safari Inquiry
                                            </option>
                                            <option value="booking-request">
                                                Booking Request
                                            </option>
                                            <option value="custom-tour">
                                                Custom Tour Package
                                            </option>
                                            <option value="group-booking">
                                                Group Booking
                                            </option>
                                            <option value="general-inquiry">
                                                General Inquiry
                                            </option>
                                        </select>
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-brand-primary"
                                            placeholder="Tell us about your safari dreams and requirements..."
                                            required
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-brand-secondary px-6 py-4 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-brand-secondary-hover disabled:cursor-not-allowed disabled:opacity-50"
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
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                                    <img
                                        src="/icons/bestprice.svg"
                                        alt="Best Price Guarantee"
                                        className="h-16 w-16"
                                    />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Best Price Guarantee
                                </h3>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                                    <img
                                        src="/icons/easyandquick.svg"
                                        alt="Easy & Quick Booking"
                                        className="h-16 w-16"
                                    />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Easy & Quick Booking
                                </h3>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                                    <img
                                        src="/icons/customer.svg"
                                        alt="Customer Care 24/7"
                                        className="h-16 w-16"
                                    />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    Customer Care 24/7
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
