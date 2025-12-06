import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmationDialog({ 
    title, 
    message, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    onConfirm, 
    onCancel,
    variant = 'danger'
}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                            variant === 'danger' ? 'bg-red-100 dark:bg-red-900' :
                            variant === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                            'bg-blue-100 dark:bg-blue-900'
                        }`}>
                            <AlertTriangle size={20} className={
                                variant === 'danger' ? 'text-red-600 dark:text-red-400' :
                                variant === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-blue-600 dark:text-blue-400'
                            } />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onCancel}>
                        <X size={20} />
                    </Button>
                </div>
                
                <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
                    <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={onCancel}>
                            {cancelText}
                        </Button>
                        <Button 
                            variant={variant === 'danger' ? 'destructive' : 'default'}
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}