import { NavFooter } from '@/admin/layouts/nav-footer';
import { NavMain } from '@/admin/components/nav-main';
import { NavUser } from '@/admin/layouts/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    MapPin,
    Calendar,
    Users,
    MessageSquare,
    Building2,
    Navigation,
    Star,
} from 'lucide-react';
import AppLogo from '@/admin/layouts/app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Destinations',
        href: '/admin/destinations',
        icon: Navigation,
    },
    {
        title: 'Bookings',
        href: '/admin/bookings',
        icon: Calendar,
    },
    {
        title: 'Customers',
        href: '/admin/customers',
        icon: Users,
    },
    { title: 'Accommodations', href: '/admin/accommodations', icon: Building2 },
    {
        title: 'Messages',
        href: '/admin/messages',
        icon: MessageSquare,
    },
    {
        title: 'Reviews',
        href: '/admin/reviews',
        icon: Star,
    },
    {
        title: 'Blog Posts',
        href: '/admin/blog',
        icon: BookOpen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Visit Site',
        href: '/',
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
