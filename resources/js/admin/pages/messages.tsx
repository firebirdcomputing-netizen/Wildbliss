import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Eye, MessageSquare, Clock, RefreshCw, Filter, X } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import MessageDialog from '@/admin/dialogs/message-dialog';

interface Message {
    id: number;
    name: string;
    email: string;
    contact_number?: string;
    adults: number;
    children: number;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    created_at: string;
}

interface Props {
    messages: Message[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Messages', href: '/admin/messages' },
];

export default function Messages({ messages }: Props) {
    const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>(
        'all',
    );
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(
        null,
    );

    const markAsRead = (messageId: number) => {
        router.put(`/admin/messages/${messageId}`, {
            status: 'read',
        });
    };

    const openMessage = (message: Message) => {
        setSelectedMessage(message);
        if (message.status === 'unread') {
            markAsRead(message.id);
        }
    };

    const refresh = () => {
        router.reload();
    };

    const filteredMessages = messages.filter(
        (message) => filter === 'all' || message.status === filter,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages - WildBliss Tours Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Messages
                    </h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={refresh}>
                            <RefreshCw size={16} />
                        </Button>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="all">All Messages</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                        </select>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="p-6">
                        <div className="space-y-4">
                            {filteredMessages.length === 0 ? (
                                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                                    {filter === 'all'
                                        ? 'No messages yet'
                                        : `No ${filter} messages`}
                                </div>
                            ) : (
                                filteredMessages.map((message) => (
                                    <div
                                        key={message.id}
                                        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                        onClick={() => openMessage(message)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                                                <MessageSquare
                                                    size={20}
                                                    className="text-orange-600 dark:text-orange-400"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {message.name}
                                                    </h3>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        ({message.email})
                                                    </span>
                                                </div>
                                                <p className="mt-1 font-medium text-gray-800 dark:text-gray-200">
                                                    {message.subject}
                                                </p>
                                                <p className="mt-1 max-w-md truncate text-sm text-gray-600 dark:text-gray-400">
                                                    {message.message}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {message.adults} adults
                                                    {message.children > 0 &&
                                                        `, ${message.children} children`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <Clock size={14} />
                                                    {new Date(
                                                        message.created_at,
                                                    ).toLocaleDateString()}
                                                </div>
                                                <span
                                                    className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${
                                                        message.status ===
                                                        'unread'
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                            : message.status ===
                                                                'read'
                                                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    }`}
                                                >
                                                    {message.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        message.status.slice(1)}
                                                </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openMessage(message);
                                                }}
                                            >
                                                <Eye size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedMessage && (
                <MessageDialog
                    message={selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                />
            )}
        </AppLayout>
    );
}
