import FeaturesSection from '@/components/features-section';
import HeroSection from '@/components/hero-section';
import InspirationSection from '@/components/inspiration-section';
import PopularTours from '@/components/popular-tours';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    const whatsappUrl = `https://wa.me/254724777159?text=Hello! I'm interested in your safari tours.`;

    return (
        <PublicLayout>
            <Head title="WildBliss Tours - Discover Kenya's Wild Beauty">
                <meta name="description" content="Experience unforgettable safari adventures through Kenya's most spectacular national parks with WildBliss Tours." />
            </Head>
            <HeroSection />
            <FeaturesSection />
            <PopularTours />
            <InspirationSection />

            {/* WhatsApp Chat Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-[0_2px_10px_rgba(37,211,102,0.5)] hover:shadow-[0_4px_20px_rgba(37,211,102,0.7)] transition-all duration-300 flex items-center justify-center group hover:scale-110"
                aria-label="Contact us on WhatsApp"
            >
                <svg
                    viewBox="0 0 32 32"
                    className="h-9 w-9"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M16.002 3.2c-7.069 0-12.8 5.731-12.8 12.8 0 2.243.582 4.349 1.602 6.179l-1.698 6.221 6.363-1.67a12.745 12.745 0 006.533 1.77c7.069 0 12.8-5.731 12.8-12.8s-5.731-12.8-12.8-12.8zm0 23.467c-1.896 0-3.661-.495-5.198-1.362l-.373-.222-3.861 1.013 1.03-3.765-.244-.386a10.59 10.59 0 01-1.621-5.745c0-5.891 4.776-10.667 10.667-10.667s10.667 4.776 10.667 10.667-4.776 10.667-10.667 10.667zm5.845-7.979c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.351-.498-2.573-1.587-.951-.848-1.593-1.894-1.78-2.214-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.987-2.374-.26-.624-.524-.54-.72-.55-.187-.009-.4-.011-.613-.011s-.56.08-.853.4c-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.243 3.424 5.433 4.801.76.328 1.353.524 1.815.671.763.242 1.457.208 2.006.126.612-.091 1.893-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"></path>
                </svg>
                <span className="absolute left-full ml-4 px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-200">
                    Contact WhatsApp
                </span>
            </a>
        </PublicLayout>
    );
}
