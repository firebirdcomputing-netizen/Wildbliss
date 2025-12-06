import { X, User, Mail, Phone, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    message: Message;
    onClose: () => void;
}

export default function MessageDialog({ message, onClose }: Props) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Message Details</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-500" />
                            <span className="font-medium">{message.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-500" />
                            <span>{message.email}</span>
                        </div>
                        {message.contact_number && (
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-500" />
                                <span>{message.contact_number}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-500" />
                            <span>{message.adults} adults{message.children > 0 && `, ${message.children} children`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-500" />
                            <span>{new Date(message.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Subject</h3>
                        <p className="text-gray-700 dark:text-gray-300">{message.subject}</p>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Message</h3>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{message.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
