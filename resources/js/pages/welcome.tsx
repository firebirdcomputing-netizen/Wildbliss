import FeaturesSection from '@/components/features-section';
import HeroSection from '@/components/hero-section';
import InspirationSection from '@/components/inspiration-section';
import PopularTours from '@/components/popular-tours';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <PublicLayout>
            <Head title="WildBliss Tours - Discover Kenya's Wild Beauty">
                <meta name="description" content="Experience unforgettable safari adventures through Kenya's most spectacular national parks with WildBliss Tours." />
            </Head>
            <HeroSection />
            <FeaturesSection />
            <PopularTours />
            <InspirationSection />
        </PublicLayout>
    );
}
