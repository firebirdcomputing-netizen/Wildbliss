import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Calendar, User, ArrowRight, Search, Filter, Tag } from 'lucide-react';
import { useState } from 'react';

export default function Blog() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        'All',
        'Wildlife',
        'Travel Tips',
        'Birdwatching',
        'Photography',
        'Conservation',
    ];

    const blogPosts = [
        {
            id: 1,
            title: 'Best Time to Visit Masai Mara for the Great Migration',
            excerpt:
                'Discover the optimal months to witness the spectacular wildebeest migration in Masai Mara National Reserve.',
            image: '/destinations/masai-mara.jpg',
            author: 'Safari Expert',
            date: '2024-01-15',
            category: 'Wildlife',
            readTime: '5 min read',
        },
        {
            id: 2,
            title: 'Essential Safari Packing Guide for Kenya',
            excerpt:
                'Everything you need to pack for your Kenyan safari adventure, from clothing to photography equipment.',
            image: '/destinations/amboseli.jpg',
            author: 'Travel Guide',
            date: '2024-01-10',
            category: 'Travel Tips',
            readTime: '7 min read',
        },
        {
            id: 3,
            title: 'Top 10 Birds to Spot in Lake Nakuru',
            excerpt:
                'A comprehensive guide to the amazing bird species you can encounter at Lake Nakuru National Park.',
            image: '/destinations/nakuru.jpg',
            author: 'Wildlife Photographer',
            date: '2024-01-05',
            category: 'Birdwatching',
            readTime: '6 min read',
        },
        {
            id: 4,
            title: 'Wildlife Photography Tips for Safari',
            excerpt:
                'Master the art of capturing stunning wildlife photos during your African safari adventure.',
            image: '/destinations/tsavo.jpg',
            author: 'Pro Photographer',
            date: '2023-12-28',
            category: 'Photography',
            readTime: '8 min read',
        },
        {
            id: 5,
            title: 'Conservation Efforts in Kenyan National Parks',
            excerpt:
                "Learn about the ongoing conservation initiatives protecting Kenya's incredible wildlife and ecosystems.",
            image: '/destinations/amboseli.jpg',
            author: 'Conservation Expert',
            date: '2023-12-20',
            category: 'Conservation',
            readTime: '10 min read',
        },
    ];

    const filteredPosts = blogPosts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <PublicLayout>
            <Head title="Blog - WildBliss Tours">
                <meta
                    name="description"
                    content="Read our latest safari guides, wildlife insights, and travel tips for your Kenya adventure with WildBliss Tours."
                />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-brand-primary to-brand-primary/90 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                            Safari Stories & Travel Guides
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100">
                            Discover expert insights, wildlife stories, and
                            essential travel tips for your Kenyan safari
                            adventure.
                        </p>

                        {/* Hero Search */}
                        <div className="mx-auto max-w-md">
                            <div className="relative">
                                <Search
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full rounded-xl border-0 bg-white/90 py-4 pr-4 pl-12 text-gray-900 placeholder-gray-500 shadow-lg backdrop-blur-sm transition-all focus:bg-white focus:ring-2 focus:ring-white/50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Filters Section */}
                    <div className="mb-12">
                        {/* Mobile Search + Filter Button */}
                        <div className="mb-6 flex gap-3 lg:hidden">
                            <div className="relative flex-1">
                                <Search
                                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 shadow-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 rounded-xl px-4 py-3 font-medium shadow-sm transition-all ${
                                    showFilters
                                        ? 'bg-brand-primary text-white'
                                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Filter size={18} />
                                <span className="hidden sm:inline">
                                    Categories
                                </span>
                            </button>
                        </div>

                        {/* Desktop Filters */}
                        <div className="mb-6 hidden items-center justify-between lg:flex">
                            <div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                    Latest Articles
                                </h2>
                                <p className="text-gray-600">
                                    Expert insights and travel guides for your
                                    safari adventure
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                            selectedCategory === category
                                                ? 'bg-brand-primary text-white shadow-sm'
                                                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Categories Dropdown */}
                        {showFilters && (
                            <div className="mb-6 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm lg:hidden">
                                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
                                    <Tag size={16} />
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() =>
                                                setSelectedCategory(category)
                                            }
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                                selectedCategory === category
                                                    ? 'bg-brand-primary text-white shadow-sm'
                                                    : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Results Count */}
                        <div className="mb-8 flex items-center justify-between">
                            <div className="lg:hidden">
                                <h2 className="mb-1 text-xl font-bold text-gray-900">
                                    Latest Articles
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Expert insights for your safari adventure
                                </p>
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-500">
                                <span className="font-medium">
                                    {filteredPosts.length}
                                </span>
                                <span>articles found</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="rounded-full bg-brand-secondary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>

                                <div className="p-6">
                                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>
                                                    {new Date(
                                                        post.date,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <span className="rounded-full bg-gray-100 px-2 py-1 font-medium">
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-primary">
                                        {post.title}
                                    </h2>

                                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                                                <User
                                                    size={14}
                                                    className="text-brand-primary"
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">
                                                {post.author}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors group-hover:gap-3 hover:text-brand-secondary">
                                            Read More
                                            <ArrowRight
                                                size={16}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="py-16 text-center">
                            <div className="mb-4 text-gray-400">
                                <Search size={64} className="mx-auto" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                No articles found
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Try adjusting your search or category filter
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All');
                                }}
                                className="rounded-xl bg-brand-primary px-6 py-3 font-medium text-white transition-colors hover:bg-brand-primary/90"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            {/* <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-primary/90 p-8 text-center text-white md:p-12">
                        <div className="absolute inset-0 bg-[url('/destinations/masai-mara.jpg')] bg-cover bg-center opacity-10" />
                        <div className="relative z-10">
                            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                Stay Updated with Safari Insights
                            </h2>
                            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100 md:text-xl">
                                Get the latest safari tips, wildlife updates,
                                and exclusive travel guides delivered to your
                                inbox.
                            </p>
                            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 rounded-xl bg-white/95 px-6 py-4 text-gray-900 placeholder-gray-500 shadow-lg backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
                                />
                                <button className="rounded-xl bg-brand-secondary px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-secondary/90 hover:shadow-xl">
                                    Subscribe
                                </button>
                            </div>
                            <p className="mt-4 text-xs text-blue-200">
                                Join 2,500+ safari enthusiasts. Unsubscribe
                                anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}
        </PublicLayout>
    );
}
