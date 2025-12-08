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
        <nav className="sticky top-0 z-50 bg-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center transition-opacity hover:opacity-80"
                        >
                            <img
                                src="/logo.png"
                                alt="WildBliss Tours"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-1">
                        <Link
                            href="/"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-brand-primary"
                        >
                            Home
                        </Link>

                        <Link
                            href="/destination"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-brand-primary"
                        >
                            Destinations
                        </Link>

                        {/* Tours Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleToursDropdown}
                                className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-brand-primary ${
                                    isToursOpen
                                        ? 'bg-gray-50 text-brand-primary'
                                        : ''
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
                            <div
                                className={`absolute top-full left-0 mt-2 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-300 ${
                                    isToursOpen
                                        ? 'visible translate-y-0 transform opacity-100'
                                        : 'invisible -translate-y-2 transform opacity-0'
                                }`}
                            >
                                <div className="py-3">
                                    <div className="border-b border-gray-100 px-4 py-2">
                                        <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                            Safari Experiences
                                        </p>
                                    </div>
                                    <Link
                                        href="/tours/4x4-safaris"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            4X4 Safaris
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/day-tours"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Day Tours
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/kenya-camping-safaris"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Kenya Camping Safaris
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/kenya-tanzania-safaris"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Kenya - Tanzania Safaris
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/kenya-wildlife-safaris"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Kenya Wildlife Safaris
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/mountain-climbing"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Mountain Climbing
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/tanzania-wildlife-safaris"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Tanzania Wildlife Safaris
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/plantations"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Plantations
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/charity"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Charity
                                        </span>
                                    </Link>
                                    <Link
                                        href="/tours/beaches"
                                        className="group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-brand-primary hover:text-white"
                                    >
                                        <span className="font-medium">
                                            Beaches
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/blog"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-brand-primary"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-brand-primary"
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
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-lg p-2 text-gray-700 transition-colors hover:text-brand-primary"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`transition-all duration-300 ease-in-out lg:hidden ${
                        isOpen
                            ? 'max-h-screen opacity-100'
                            : 'max-h-0 overflow-hidden opacity-0'
                    }`}
                >
                    <div className="space-y-1 border-t border-gray-100 bg-white px-2 pt-2 pb-4">
                        <Link
                            href="/"
                            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-brand-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            href="/destination"
                            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-brand-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Destinations
                        </Link>

                        {/* Mobile Tours Section */}
                        <div className="px-4 py-2">
                            <button
                                onClick={() =>
                                    setIsMobileToursOpen(!isMobileToursOpen)
                                }
                                className="flex w-full items-center justify-between py-2 text-base font-medium text-gray-700 transition-all hover:text-brand-primary"
                            >
                                Tours
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${
                                        isMobileToursOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    isMobileToursOpen
                                        ? 'mt-2 max-h-96 opacity-100'
                                        : 'max-h-0 overflow-hidden opacity-0'
                                }`}
                            >
                                <div className="space-y-1 border-l-2 border-gray-100 pl-4">
                                    <Link
                                        href="/tours/4x4-safaris"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        4X4 Safaris
                                    </Link>
                                    <Link
                                        href="/tours/day-tours"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Day Tours
                                    </Link>
                                    <Link
                                        href="/tours/kenya-camping-safaris"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Kenya Camping Safaris
                                    </Link>
                                    <Link
                                        href="/tours/kenya-tanzania-safaris"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Kenya - Tanzania Safaris
                                    </Link>
                                    <Link
                                        href="/tours/kenya-wildlife-safaris"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Kenya Wildlife Safaris
                                    </Link>
                                    <Link
                                        href="/tours/mountain-climbing"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Mountain Climbing
                                    </Link>
                                    <Link
                                        href="/tours/tanzania-wildlife-safaris"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Tanzania Wildlife Safaris
                                    </Link>
                                    <Link
                                        href="/tours/plantations"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Plantations
                                    </Link>
                                    <Link
                                        href="/tours/charity"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Charity
                                    </Link>
                                    <Link
                                        href="/tours/beaches"
                                        className="block py-2 text-sm text-gray-600 transition-colors hover:text-brand-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Beaches
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/blog"
                            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-brand-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-brand-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="px-4 pt-2">
                            <Link
                                href="/destination"
                                className="block rounded-lg bg-brand-secondary px-4 py-3 text-center text-base font-semibold text-white transition-all hover:bg-brand-secondary-hover"
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
