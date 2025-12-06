import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Eye,
    MessageSquare,
    Clock,
    RefreshCw,
    Filter,
    X,
    Grid3X3,
    List,
} from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import MessageDialog from '@/admin/dialogs/message-dialog';
import { useLayoutPreference } from '@/hooks/use-layout-preference';

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
    const { layoutMode, updateLayoutMode } = useLayoutPreference();

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
                            Refresh
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
                        <Button
                            variant={
                                layoutMode === 'grid' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => updateLayoutMode('grid')}
                            className="flex items-center gap-2"
                        >
                            <Grid3X3 size={16} />
                            Grid
                        </Button>
                        <Button
                            variant={
                                layoutMode === 'table' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => updateLayoutMode('table')}
                            className="flex items-center gap-2"
                        >
                            <List size={16} />
                            Table
                        </Button>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="p-6">
                        {filteredMessages.length === 0 ? (
                            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                                {filter === 'all'
                                    ? 'No messages yet'
                                    : `No ${filter} messages`}
                            </div>
                        ) : layoutMode === 'table' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-600">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Email</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Subject</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Message</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Group</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMessages.map((message) => (
                                            <tr 
                                                key={message.id} 
                                                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                                onClick={() => openMessage(message)}
                                            >
                                                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{message.name}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{message.email}</td>
                                                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-medium">{message.subject}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{message.message}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {message.adults} adults
                                                    {message.children > 0 && `, ${message.children} children`}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs ${
                                                            message.status === 'unread'
                                                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                                : message.status === 'read'
                                                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        }`}
                                                    >
                                                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(message.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openMessage(message);
                                                        }}
                                                    >
                                                        <Eye size={14} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredMessages.map((message) => (
                                    <div
                                        key={message.id}
                                        className="cursor-pointer rounded-lg border border-gray-100 p-4 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 hover:shadow-md transition-shadow"
                                        onClick={() => openMessage(message)}
                                    >
                                        <div className="mb-3 flex items-start justify-between">
                                            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                                                <MessageSquare
                                                    size={16}
                                                    className="text-orange-600 dark:text-orange-400"
                                                />
                                            </div>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs ${
                                                    message.status === 'unread'
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

                                        <div className="mb-3">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {message.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {message.email}
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {message.subject}
                                            </p>
                                            <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                {message.message}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <span>
                                                {message.adults} adults
                                                {message.children > 0 &&
                                                    `, ${message.children} children`}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(
                                                    message.created_at,
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
