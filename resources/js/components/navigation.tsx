import { Link } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isToursOpen, setIsToursOpen] = useState(false);
    const [isMobileToursOpen, setIsMobileToursOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsToursOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleToursDropdown = () => {
        setIsToursOpen(!isToursOpen);
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                            <img src="/logo.png" alt="WildBliss Tours" className="h-10 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-1">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                            Home
                        </Link>

                        <Link
                            href="/destination"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                            Destinations
                        </Link>

                        {/* Tours Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleToursDropdown}
                                className={`flex items-center text-gray-700 hover:text-brand-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isToursOpen ? 'text-brand-primary bg-gray-50' : ''
                                }`}
                            >
                                Tours
                                <ChevronDown
                                    size={16}
                                    className={`ml-1 transition-transform duration-200 ${
                                        isToursOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                                isToursOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                            }`}>
                                <div className="py-3">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Safari Experiences</p>
                                    </div>
                                    <Link
                                        href="/tours/4x4-safaris"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">4X4 Safaris</span>
                                    </Link>
                                    <Link
                                        href="/tours/day-tours"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Day Tours</span>
                                    </Link>
                                    <Link
                                        href="/tours/kenya-camping-safaris"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Kenya Camping Safaris</span>
                                    </Link>
                                    <Link
                                        href="/tours/kenya-tanzania-safaris"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Kenya - Tanzania Safaris</span>
                                    </Link>
                                    <Link
                                        href="/tours/kenya-wildlife-safaris"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Kenya Wildlife Safaris</span>
                                    </Link>
                                    <Link
                                        href="/tours/mountain-climbing"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Mountain Climbing</span>
                                    </Link>
                                    <Link
                                        href="/tours/tanzania-wildlife-safaris"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Tanzania Wildlife Safaris</span>
                                    </Link>
                                    <Link
                                        href="/tours/plantations"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Plantations</span>
                                    </Link>
                                    <Link
                                        href="/tours/charity"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Charity</span>
                                    </Link>
                                    <Link
                                        href="/tours/beaches"
                                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary hover:text-white transition-all duration-200 group"
                                    >
                                        <span className="font-medium">Beaches</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/blog"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                            Contact
                        </Link>
                        {/* <Link
                            href="/book-now"
                            className="bg-brand-secondary hover:bg-brand-secondary-hover text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 ml-4"
                        >
                            Book Now
                        </Link> */}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-brand-primary p-2 rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-100">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 block px-4 py-3 rounded-lg text-base font-medium transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            href="/destination"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 block px-4 py-3 rounded-lg text-base font-medium transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Destinations
                        </Link>

                        {/* Mobile Tours Section */}
                        <div className="px-4 py-2">
                            <button
                                onClick={() => setIsMobileToursOpen(!isMobileToursOpen)}
                                className="flex items-center justify-between w-full text-gray-700 hover:text-brand-primary py-2 text-base font-medium transition-all"
                            >
                                Tours
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${
                                        isMobileToursOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${
                                isMobileToursOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'
                            }`}>
                                <div className="pl-4 space-y-1 border-l-2 border-gray-100">
                                    <Link
                                        href="/tours/4x4-safaris"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        4X4 Safaris
                                    </Link>
                                    <Link
                                        href="/tours/day-tours"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Day Tours
                                    </Link>
                                    <Link
                                        href="/tours/kenya-camping-safaris"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Kenya Camping Safaris
                                    </Link>
                                    <Link
                                        href="/tours/kenya-tanzania-safaris"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Kenya - Tanzania Safaris
                                    </Link>
                                    <Link
                                        href="/tours/kenya-wildlife-safaris"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Kenya Wildlife Safaris
                                    </Link>
                                    <Link
                                        href="/tours/mountain-climbing"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Mountain Climbing
                                    </Link>
                                    <Link
                                        href="/tours/tanzania-wildlife-safaris"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Tanzania Wildlife Safaris
                                    </Link>
                                    <Link
                                        href="/tours/plantations"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Plantations
                                    </Link>
                                    <Link
                                        href="/tours/charity"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Charity
                                    </Link>
                                    <Link
                                        href="/tours/beaches"
                                        className="block py-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Beaches
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/blog"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 block px-4 py-3 rounded-lg text-base font-medium transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-brand-primary hover:bg-gray-50 block px-4 py-3 rounded-lg text-base font-medium transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="px-4 pt-2">
                            <Link
                                href="/book-now"
                                className="bg-brand-secondary hover:bg-brand-secondary-hover text-white block px-4 py-3 rounded-lg text-base font-semibold transition-all text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
