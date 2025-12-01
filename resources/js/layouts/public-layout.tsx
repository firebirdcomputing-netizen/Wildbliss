import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}