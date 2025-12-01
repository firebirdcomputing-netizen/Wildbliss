import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms of Service - WildBliss Tours">
                <meta name="description" content="Terms of Service for WildBliss Tours and Safaris. Read our terms and conditions." />
            </Head>

            <div className="min-h-screen bg-gray-50 py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                        
                        <div className="prose prose-gray max-w-none">
                            <p className="text-lg text-gray-600 mb-8">
                                Last updated: January 2025
                            </p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                                <p className="text-gray-600">
                                    By accessing and using WildBliss Tours services, you accept and agree to be bound by 
                                    the terms and provision of this agreement.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking and Payment</h2>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>All bookings require a deposit to secure your reservation</li>
                                    <li>Full payment is due 30 days before departure</li>
                                    <li>Prices are subject to change until booking is confirmed</li>
                                    <li>We accept major credit cards and bank transfers</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-yellow-800 mb-2">Cancellation Fees:</h3>
                                    <ul className="list-disc pl-6 text-yellow-700 space-y-1">
                                        <li>More than 60 days: 10% of total cost</li>
                                        <li>30-60 days: 25% of total cost</li>
                                        <li>15-30 days: 50% of total cost</li>
                                        <li>Less than 15 days: 100% of total cost</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Travel Requirements</h2>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>Valid passport required for all travelers</li>
                                    <li>Visa requirements vary by nationality</li>
                                    <li>Travel insurance is strongly recommended</li>
                                    <li>Health requirements may apply (vaccinations, etc.)</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Liability</h2>
                                <p className="text-gray-600">
                                    WildBliss Tours acts as an agent for suppliers and is not liable for their acts or omissions. 
                                    We recommend comprehensive travel insurance to cover unforeseen circumstances.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Force Majeure</h2>
                                <p className="text-gray-600">
                                    We are not liable for any failure to perform due to circumstances beyond our reasonable control, 
                                    including natural disasters, government actions, or other force majeure events.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                                <p className="text-gray-600 mb-4">
                                    For questions about these Terms of Service, please contact us:
                                </p>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-gray-700">
                                        <strong>Email:</strong> info@wildblisstours.com<br />
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