import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from 'lucide-react';

interface BlogPostProps {
    id: string;
}

export default function BlogPost({ id }: BlogPostProps) {
    // Mock blog post data - in real app this would come from props/server
    const blogPosts = {
        '1': {
            id: 1,
            title: 'Best Time to Visit Masai Mara for the Great Migration',
            excerpt: 'Discover the optimal months to witness the spectacular wildebeest migration in Masai Mara National Reserve.',
            image: '/destinations/masai-mara.jpg',
            author: 'Safari Expert',
            date: '2024-01-15',
            category: 'Wildlife',
            readTime: '5 min read',
            content: `
                <p>The Great Migration is one of nature's most spectacular events, and timing your visit to Masai Mara is crucial for witnessing this incredible phenomenon. The migration follows a predictable pattern, but weather conditions can affect exact timing.</p>
                
                <h2>Peak Migration Season: July to October</h2>
                <p>The best time to visit Masai Mara for the Great Migration is between July and October. During this period, over 1.5 million wildebeest, along with hundreds of thousands of zebras and gazelles, cross from Tanzania's Serengeti into Kenya's Masai Mara.</p>
                
                <h3>July - August: River Crossings</h3>
                <p>This is when you'll witness the famous river crossings at the Mara River. The herds gather courage to cross the crocodile-infested waters, creating dramatic scenes that wildlife photographers dream of capturing.</p>
                
                <h3>September - October: Peak Numbers</h3>
                <p>The highest concentration of animals is typically found during these months. The grasslands are filled with grazing herds, and predator activity is at its peak as lions, leopards, and cheetahs take advantage of the abundant prey.</p>
                
                <h2>What to Expect During Migration</h2>
                <p>During the migration season, you can expect:</p>
                <ul>
                    <li>Massive herds stretching to the horizon</li>
                    <li>Dramatic river crossings with crocodile encounters</li>
                    <li>Increased predator activity and hunting scenes</li>
                    <li>Excellent photography opportunities</li>
                    <li>Higher accommodation prices and crowds</li>
                </ul>
                
                <h2>Planning Your Visit</h2>
                <p>Book your safari well in advance, especially for July through September. Consider staying in camps closer to the Mara River for the best river crossing viewing opportunities. Weather can be unpredictable, so pack layers and rain gear.</p>
            `
        },
        '2': {
            id: 2,
            title: 'Essential Safari Packing Guide for Kenya',
            excerpt: 'Everything you need to pack for your Kenyan safari adventure, from clothing to photography equipment.',
            image: '/destinations/amboseli.jpg',
            author: 'Travel Guide',
            date: '2024-01-10',
            category: 'Travel Tips',
            readTime: '7 min read',
            content: `
                <p>Packing for a Kenyan safari requires careful consideration of the climate, activities, and practical needs. This comprehensive guide will ensure you're well-prepared for your adventure.</p>
                
                <h2>Clothing Essentials</h2>
                <h3>Neutral Colors</h3>
                <p>Stick to khaki, beige, olive green, and brown colors. Avoid bright colors and black (attracts tsetse flies) or white (shows dirt easily).</p>
                
                <h3>Layering System</h3>
                <ul>
                    <li>Lightweight long-sleeved shirts for sun protection</li>
                    <li>Comfortable safari pants</li>
                    <li>Warm fleece or jacket for early morning game drives</li>
                    <li>Rain jacket or poncho</li>
                </ul>
                
                <h2>Footwear</h2>
                <p>Bring comfortable walking boots, lightweight sneakers for camp, and sandals for relaxing. Ensure boots are broken in before your trip.</p>
                
                <h2>Photography Equipment</h2>
                <p>A good camera with telephoto lens is essential. Don't forget extra batteries, memory cards, and a dust-proof camera bag. Binoculars are also highly recommended.</p>
                
                <h2>Health and Safety Items</h2>
                <ul>
                    <li>Sunscreen (SPF 30+)</li>
                    <li>Insect repellent with DEET</li>
                    <li>Personal medications</li>
                    <li>First aid kit basics</li>
                    <li>Hand sanitizer</li>
                </ul>
            `
        }
    };

    const post = blogPosts[id as keyof typeof blogPosts];

    if (!post) {
        return (
            <PublicLayout>
                <Head title="Post Not Found - WildBliss Tours" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Post Not Found</h1>
                        <Link href="/blog" className="mt-4 text-brand-primary hover:underline">
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title={`${post.title} - WildBliss Tours`}>
                <meta name="description" content={post.excerpt} />
            </Head>

            {/* Hero Section */}
            <section className="relative h-96 overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
                        <Link
                            href="/blog"
                            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                        >
                            <ArrowLeft size={16} />
                            Back to Blog
                        </Link>
                        
                        <div className="mb-4">
                            <span className="rounded-full bg-brand-secondary px-3 py-1 text-xs font-semibold text-white">
                                {post.category}
                            </span>
                        </div>
                        
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                                <User size={20} className="text-brand-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{post.author}</p>
                                <p className="text-sm text-gray-600">Safari Expert & Travel Writer</p>
                            </div>
                        </div>
                        
                        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                            <Share2 size={16} />
                            Share
                        </button>
                    </div>

                    <div 
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-primary prose-strong:text-gray-900 prose-ul:text-gray-700"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <div className="flex items-center gap-3">
                            <Tag size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-500">Tags:</span>
                            <div className="flex gap-2">
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    {post.category}
                                </span>
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    Safari
                                </span>
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    Kenya
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900">Related Articles</h2>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Object.values(blogPosts)
                            .filter(p => p.id !== post.id)
                            .slice(0, 3)
                            .map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.id}`}
                                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="rounded-full bg-brand-secondary/90 px-2 py-1 text-xs font-semibold text-white">
                                                {relatedPost.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4">
                                        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 group-hover:text-brand-primary">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                            {relatedPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{relatedPost.author}</span>
                                            <span>{relatedPost.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}