import { Link } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
    Globe,
    Heart,
} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-brand-secondary text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <div className="mb-6 flex items-center space-x-3">
                                <img
                                    src="/logo.png"
                                    alt="Wild Bliss Tours logo"
                                    className="h-10 w-auto"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Wild Bliss Tours
                                    </h3>
                                    <p className="text-sm text-white/80">
                                        Creating unforgettable safari memories
                                    </p>
                                </div>
                            </div>
                            <p className="mb-6 max-w-md leading-relaxed text-white/70">
                                Experience Kenya's incredible wildlife and
                                landscapes with our expertly crafted safari
                                adventures. From the Big Five to cultural
                                encounters, we create memories that last a
                                lifetime.
                            </p>
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://www.facebook.com/wildblisstours"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                >
                                    <Facebook size={18} />
                                </a>
                                <a
                                    href="https://x.com/WildBlissTours"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                >
                                    <Twitter size={18} />
                                </a>
                                <a
                                    href="https://www.instagram.com/wildbliss.tours/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
                                >
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="mb-6 text-lg font-semibold">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-white/70 transition-colors hover:text-white"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/destination"
                                        className="text-white/70 transition-colors hover:text-white"
                                    >
                                        Destinations
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tours"
                                        className="text-white/70 transition-colors hover:text-white"
                                    >
                                        Tours
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="text-white/70 transition-colors hover:text-white"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-white/70 transition-colors hover:text-white"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="mb-6 text-lg font-semibold">
                                Get in Touch
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone
                                        size={18}
                                        className="mt-1 flex-shrink-0 text-white/60"
                                    />
                                    <div>
                                        <p className="text-sm text-white/60">
                                            Call Us
                                        </p>
                                        <a
                                            href="tel:+254724777159"
                                            className="font-medium text-white transition-colors hover:text-white/80"
                                        >
                                            +254 724 777159
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail
                                        size={18}
                                        className="mt-1 flex-shrink-0 text-white/60"
                                    />
                                    <div>
                                        <p className="text-sm text-white/60">
                                            Email Us
                                        </p>
                                        <a
                                            href="mailto:info@wildblisstoursandsafaris.com"
                                            className="font-medium break-all text-white transition-colors hover:text-white/80"
                                        >
                                            info@wildblisstoursandsafaris.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin
                                        size={18}
                                        className="mt-1 flex-shrink-0 text-white/60"
                                    />
                                    <div>
                                        <p className="text-sm text-white/60">
                                            Visit Us
                                        </p>
                                        <p className="font-medium text-white">
                                            College House 4th Floor
                                            <br />
                                            Koinange Street, Nairobi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 py-6">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex flex-col items-center gap-2 text-sm text-white/70 sm:flex-row sm:gap-4">
                            <p className="flex items-center gap-1">
                                © 2025 Wild Bliss Tours and Safaris. All rights
                                reserved.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/privacy"
                                    className="transition-colors hover:text-white"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="transition-colors hover:text-white"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                            <Globe size={16} />
                            <span>English (US)</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
