import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Upload, X, Plus, Loader2 } from 'lucide-react';

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

interface BlogDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post: BlogPost | null;
}

export function BlogDialog({ open, onOpenChange, post }: BlogDialogProps) {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: '',
        read_time: '',
        status: 'draft' as 'draft' | 'published',
        tags: [] as string[],
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                category: post.category,
                author: post.author,
                read_time: post.read_time,
                status: post.status,
                tags: [],
            });
            setImagePreview(post.image_url || '');
        } else {
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                category: '',
                author: '',
                read_time: '',
                status: 'draft',
                tags: [],
            });
            setImagePreview('');
        }
        setImageFile(null);
        setIsSubmitting(false);
        setNewTag('');
    }, [post, open]);

    const categories = [
        'Wildlife',
        'Travel Tips',
        'Birdwatching',
        'Photography',
        'Conservation',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'tags') {
                data.append(key, JSON.stringify(value));
            } else {
                data.append(key, value as string);
            }
        });
        
        if (imageFile) {
            data.append('image', imageFile);
        }

        if (post) {
            data.append('_method', 'PUT');
            router.post(`/admin/blog/${post.id}`, data, {
                onSuccess: () => {
                    setIsSubmitting(false);
                    onOpenChange(false);
                },
                onError: () => setIsSubmitting(false),
            });
        } else {
            router.post('/admin/blog', data, {
                onSuccess: () => {
                    setIsSubmitting(false);
                    onOpenChange(false);
                },
                onError: () => setIsSubmitting(false),
            });
        }
    };

    const handleInputChange = (field: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {post ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Enter blog post title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleInputChange('category', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="author">Author</Label>
                            <Input
                                id="author"
                                value={formData.author}
                                onChange={(e) => handleInputChange('author', e.target.value)}
                                placeholder="Author name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="read_time">Read Time</Label>
                            <Input
                                id="read_time"
                                value={formData.read_time}
                                onChange={(e) => handleInputChange('read_time', e.target.value)}
                                placeholder="e.g., 5 min read"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => handleInputChange('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Featured Image</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="flex-1"
                            />
                            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('image')?.click()}>
                                <Upload size={16} />
                                Upload
                            </Button>
                        </div>
                        {imagePreview && (
                            <div className="mt-2">
                                <img src={imagePreview} alt="Preview" className="h-32 w-48 object-cover rounded-lg" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a tag"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    className="flex-1"
                                />
                                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                                    <Plus size={16} />
                                </Button>
                            </div>
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-blue-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            value={formData.excerpt}
                            onChange={(e) => handleInputChange('excerpt', e.target.value)}
                            placeholder="Brief description of the blog post"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => handleInputChange('content', e.target.value)}
                            placeholder="Write your blog post content here (HTML supported)"
                            rows={12}
                            className="font-mono text-sm"
                            required
                        />
                        <p className="text-xs text-gray-500">
                            You can use HTML tags for formatting (h2, h3, p, ul, li, strong, etc.)
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="mr-2 animate-spin" />
                                    {post ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                post ? 'Update Post' : 'Create Post'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}