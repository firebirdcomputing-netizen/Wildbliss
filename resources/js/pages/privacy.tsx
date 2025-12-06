import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

export default function Privacy() {
    return (
        <PublicLayout>
            <Head title="Privacy Policy - WildBliss Tours">
                <meta name="description" content="Privacy Policy for WildBliss Tours and Safaris. Learn how we protect your personal information." />
            </Head>

            <div className="min-h-screen bg-gray-50 py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                        <div className="prose prose-gray max-w-none">
                            <p className="text-lg text-gray-600 mb-8">
                                Last updated: January 2025
                            </p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                                <p className="text-gray-600 mb-4">
                                    We collect information you provide directly to us, such as when you create an account,
                                    make a booking, or contact us for support.
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Personal information (name, email, phone number)</li>
                                    <li>Booking and travel preferences</li>
                                    <li>Payment information (processed securely)</li>
                                    <li>Communication records</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Process and manage your bookings</li>
                                    <li>Provide customer support</li>
                                    <li>Send booking confirmations and updates</li>
                                    <li>Improve our services</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                                <p className="text-gray-600 mb-4">
                                    We do not sell or rent your personal information. We may share information with:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Service providers (hotels, transport companies)</li>
                                    <li>Payment processors</li>
                                    <li>Legal authorities when required by law</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                                <p className="text-gray-600">
                                    We implement appropriate security measures to protect your personal information
                                    against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                                <p className="text-gray-600">
                                    If you have questions about this Privacy Policy, please contact us at:
                                </p>
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-gray-700">
                                        <strong>Email:</strong> info@wildblisstoursandsafaris.com<br />
                                        <strong>Phone:</strong> +254 724 777159<br />
                                        <strong>Address:</strong> College House 4th Floor, Koinange Street, Nairobi
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
