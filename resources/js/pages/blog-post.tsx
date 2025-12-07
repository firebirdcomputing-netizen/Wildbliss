import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    read_time: string;
    status: 'published' | 'draft';
    image_url?: string;
    tags?: string[];
    created_at: string;
}

interface BlogPostProps {
    id: string;
}

export default function BlogPost({ id }: BlogPostProps) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        // Fetch the specific blog post
        fetch(`/api/blog/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error('Failed to fetch blog post:', err));

        // Fetch all posts for related posts
        fetch('/api/blog')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter((p: BlogPost) => p.id !== id).slice(0, 3);
                setRelatedPosts(filtered);
            })
            .catch(err => console.error('Failed to fetch related posts:', err));
    }, [id]);

    if (!post) {
        return (
            <PublicLayout>
                <Head title="Post Not Found - WildBliss Tours" />
                <div className="flex min-h-screen items-center justify-center bg-gray-50">
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
            <section className="relative h-[70vh] overflow-hidden">
                <img
                    src={post.image_url || '/destinations/masai-mara.jpg'}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
                        <Link
                            href="/blog"
                            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:scale-105"
                        >
                            <ArrowLeft size={16} />
                            Back to Blog
                        </Link>
                        
                        <div className="mb-6">
                            <span className="rounded-full bg-brand-secondary/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                                {post.category}
                            </span>
                        </div>
                        
                        <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl leading-tight">
                            {post.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                <User size={16} />
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                <Calendar size={16} />
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                                <Clock size={16} />
                                <span>{post.read_time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-center justify-between border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80">
                                <User size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900">{post.author}</p>
                                <p className="text-gray-600">Safari Expert & Travel Writer</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: post.title,
                                        text: post.excerpt,
                                        url: window.location.href
                                    });
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                            className="flex items-center gap-2 rounded-xl bg-brand-primary/5 border border-brand-primary/20 px-6 py-3 text-sm font-medium text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
                        >
                            <Share2 size={16} />
                            Share Article
                        </button>
                    </div>

                    <div className="mb-8">
                        <div 
                            className="text-gray-900 leading-relaxed space-y-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&>p]:text-gray-900 [&>p]:mb-4 [&>ul]:text-gray-900 [&>ol]:text-gray-900 [&>li]:text-gray-900 [&>a]:text-brand-primary [&>a]:no-underline hover:[&>a]:underline [&>strong]:text-gray-900 [&>em]:text-gray-900"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Tags */}
                    <div className="mt-16 border-t border-gray-100 pt-8">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Tag size={18} className="text-brand-primary" />
                                <span className="font-semibold text-gray-900">Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full bg-brand-primary/10 text-brand-primary px-4 py-2 text-sm font-medium border border-brand-primary/20">
                                    {post.category}
                                </span>
                                {post.tags?.map((tag, index) => (
                                    <span key={index} className="rounded-full bg-gray-100 hover:bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Continue Reading</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover more safari insights and travel tips from our expert guides</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {relatedPosts.map((relatedPost) => (
                                <a
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={relatedPost.image_url || '/destinations/default.jpg'}
                                            alt={relatedPost.title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="rounded-full bg-brand-secondary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                                {relatedPost.category}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                                            <span>{relatedPost.read_time}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}