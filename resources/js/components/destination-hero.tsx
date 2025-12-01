import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function DestinationHero() {
    return (
        <section className="relative min-h-[60vh] text-white flex items-center overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/destinations/masai-mara.jpg')" }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            
            <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
                <div className="text-center">
                    <p className="text-brand-secondary text-lg font-medium mb-2">Explore East Africa</p>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Amazing Destinations
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                        Discover Kenya and Tanzania's most spectacular wildlife destinations and adventure spots. 
                        From the Great Migration to towering peaks, your next adventure awaits.
                    </p>
                    
                    <div className="pt-4">
                        <Link
                            href="/tours"
                            className="inline-flex items-center bg-brand-secondary hover:bg-brand-secondary-hover text-white px-8 py-4 rounded-lg font-semibold space-x-2 transition-all hover:scale-105"
                        >
                            <span>View All Tours</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}