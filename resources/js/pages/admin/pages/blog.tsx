import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, RefreshCw, Grid3X3, List, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { BlogDialog } from '@/admin/dialogs/blog-dialog';
import { BlogDetailsDialog } from '@/admin/dialogs/blog-details-dialog';
import ConfirmationDialog from '@/admin/dialogs/confirmation-dialog';
import { useLayoutPreference } from '@/hooks/use-layout-preference';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Posts', href: '/admin/blog' },
];

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
    created_at: string;
    updated_at: string;
}

interface Props {
    blogPosts: BlogPost[];
}

export default function AdminBlog({ blogPosts }: Props) {
    const { layoutMode, updateLayoutMode } = useLayoutPreference();
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
    };

    const handleViewDetails = (post: BlogPost) => {
        setSelectedPost(post);
        setShowDetailsDialog(true);
    };

    const handleDelete = (post: BlogPost) => {
        router.delete(`/admin/blog/${post.id}`, {
            onSuccess: () => setDeletingPost(null),
        });
    };

    const refresh = () => {
        router.reload();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Posts - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Blog Posts
                    </h1>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={refresh}>
                            <RefreshCw size={16} />
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={layoutMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateLayoutMode('grid')}
                                className="flex items-center gap-2"
                            >
                                <Grid3X3 size={16} />
                                Grid
                            </Button>
                            <Button
                                variant={layoutMode === 'table' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateLayoutMode('table')}
                                className="flex items-center gap-2"
                            >
                                <List size={16} />
                                Table
                            </Button>
                        </div>
                        <Button
                            className="flex items-center gap-2"
                            onClick={() => setShowCreateDialog(true)}
                        >
                            <Plus size={16} />
                            Add Blog Post
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {blogPosts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-6 py-16">
                            <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                                <BookOpen size={32} className="text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No blog posts yet
                            </h3>
                            <p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">
                                Start sharing your safari expertise by creating your first blog post.
                            </p>
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => setShowCreateDialog(true)}
                            >
                                <Plus size={16} />
                                Create Your First Post
                            </Button>
                        </div>
                    ) : layoutMode === 'table' ? (
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Title</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Category</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Author</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogPosts.map((post) => (
                                            <tr key={post.id} className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleViewDetails(post)}>
                                                <td className="px-4 py-3">
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{post.excerpt}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {post.category}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">{post.author}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        post.status === 'published'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    }`}>
                                                        {post.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <a href={`/blog/${post.id}`} target="_blank">
                                                                <Eye size={14} />
                                                            </a>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEdit(post); }}>
                                                            <Edit size={14} />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => { e.stopPropagation(); setDeletingPost(post); }}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {blogPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:border-brand-primary hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:hover:border-brand-primary cursor-pointer"
                                        onClick={() => handleViewDetails(post)}
                                    >
                                        <div className="p-4">
                                            <div className="mb-3 flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {post.category} • {post.read_time}
                                                    </p>
                                                </div>
                                                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    post.status === 'published'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                }`}>
                                                    {post.status}
                                                </span>
                                            </div>

                                            <p className="mb-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button variant="ghost" size="sm" asChild className="opacity-0 transition-opacity group-hover:opacity-100">
                                                        <a href={`/blog/${post.id}`} target="_blank">
                                                            <Eye size={14} />
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => { e.stopPropagation(); handleEdit(post); }}
                                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <Edit size={14} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => { e.stopPropagation(); setDeletingPost(post); }}
                                                        className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-700"
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <BlogDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                post={null}
            />

            <BlogDialog
                open={!!editingPost}
                onOpenChange={(open) => !open && setEditingPost(null)}
                post={editingPost}
            />

            <BlogDetailsDialog
                post={selectedPost}
                isOpen={showDetailsDialog}
                onClose={() => setShowDetailsDialog(false)}
                onEdit={(post) => {
                    setShowDetailsDialog(false);
                    handleEdit(post);
                }}
                onDelete={(post) => {
                    setShowDetailsDialog(false);
                    setDeletingPost(post);
                }}
            />

            {deletingPost && (
                <ConfirmationDialog
                    title="Delete Blog Post"
                    message={`Are you sure you want to delete "${deletingPost.title}"? This action cannot be undone.`}
                    confirmText="Delete"
                    onConfirm={() => handleDelete(deletingPost)}
                    onCancel={() => setDeletingPost(null)}
                    variant="danger"
                />
            )}
        </AppLayout>
    );
}
