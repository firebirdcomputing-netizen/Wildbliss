import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Edit, Trash2, Eye, Calendar, User, Clock, Tag } from 'lucide-react';

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

interface BlogDetailsDialogProps {
    post: BlogPost | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (post: BlogPost) => void;
    onDelete: (post: BlogPost) => void;
}

export function BlogDetailsDialog({ post, isOpen, onClose, onEdit, onDelete }: BlogDetailsDialogProps) {
    if (!post) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Blog Post Details</span>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" asChild>
                                <a href={`/blog/${post.id}`} target="_blank">
                                    <Eye size={16} />
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
                                <Edit size={16} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDelete(post)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {post.image_url && (
                        <div className="relative h-64 overflow-hidden rounded-lg">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex items-center gap-1">
                                <Tag size={14} />
                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {post.category}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User size={14} />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{post.read_time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                post.status === 'published'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                                {post.status}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Excerpt</h3>
                            <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Content</h3>
                            <div 
                                className="prose prose-sm max-w-none dark:prose-invert"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}