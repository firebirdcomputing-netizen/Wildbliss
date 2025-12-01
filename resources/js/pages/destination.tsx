import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import DestinationHero from '@/components/destination-hero';
import DestinationGrid from '@/components/destination-grid';

export default function Destination() {
    return (
        <PublicLayout>
            <Head title="Destinations - WildBliss Tours">
                <meta name="description" content="Explore Kenya and Tanzania's most spectacular wildlife destinations and adventure spots with WildBliss Tours." />
            </Head>
            <DestinationHero />
            <DestinationGrid />
        </PublicLayout>
    );
}
