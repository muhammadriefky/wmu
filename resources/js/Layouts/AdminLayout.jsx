import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Settings, Star, Users, Briefcase, 
    MessageSquare, FileText, BriefcaseBusiness, HelpCircle, 
    Menu, X, Building2, ChevronDown, LogOut, User as UserIcon,
    Bell, Search, ExternalLink, ShieldCheck, Home, Play, MonitorPlay
} from 'lucide-react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavItem = ({ href, routeName, icon: Icon, children }) => {
        const isActive = route().current(routeName + '*');
        return (
            <Link 
                href={href} 
                className={`flex items-center px-4 py-3 mx-4 mb-1 rounded-xl transition-all duration-300 group font-medium text-[13px] ${isActive ? 'bg-[#1E293B]/80 text-[#EAB308]' : 'text-gray-400 hover:bg-[#1E293B]/50 hover:text-gray-200'}`}
                onClick={() => setSidebarOpen(false)}
            >
                <Icon size={18} className={`mr-3 transition-all duration-300 ${isActive ? 'text-[#EAB308]' : 'text-gray-400 group-hover:text-gray-300'}`} />
                <span className="tracking-wide">{children}</span>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-[#EAB308]/20">
            {/* Mobile Sidebar Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-20 xl:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`fixed xl:sticky xl:top-0 xl:h-screen xl:self-start inset-y-0 left-0 w-[260px] shrink-0 bg-[#0B1120] text-white flex flex-col z-30 transform transition-transform duration-400 ease-in-out border-r border-gray-800 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}>
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-between px-6 shrink-0">
                    <Link href={route('dashboard')} className="flex items-center gap-2">
                        <div className="flex items-end gap-1">
                            <div className="w-1 h-5 bg-[#EAB308] rounded-full"></div>
                            <div className="w-1 h-7 bg-[#EAB308] rounded-full"></div>
                            <div className="w-1 h-4 bg-[#EAB308] rounded-full"></div>
                        </div>
                        <span className="font-bold text-lg tracking-wide text-white">WMU <span className="text-gray-400 font-normal">Panel</span></span>
                    </Link>
                    <button className="xl:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                
                {/* Profile Card */}
                <div className="px-4 mb-4">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#EAB308] to-orange-400 flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                                        {user?.nama ? user.nama.charAt(0) : 'A'}
                                    </div>
                                    <div className="text-left overflow-hidden">
                                        <p className="text-sm font-bold text-gray-100 truncate group-hover:text-white transition-colors">{user?.nama || 'Administrator'}</p>
                                        <p className="text-[11px] text-gray-400 truncate">Super Admin</p>
                                    </div>
                                </div>
                                <ChevronDown size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="left" width="48" contentClasses="py-2 bg-[#1E293B] rounded-xl shadow-xl border border-gray-700">
                            <Dropdown.Link href={route('profile.edit')} className="flex items-center text-gray-300 hover:bg-white/10 hover:text-white font-medium px-4 py-2">
                                <UserIcon size={14} className="mr-3" /> Profil Akun
                            </Dropdown.Link>
                            <div className="border-t border-gray-700 my-1"></div>
                            <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center text-red-400 hover:bg-white/10 hover:text-red-300 font-medium px-4 py-2 w-full text-left">
                                <LogOut size={14} className="mr-3" /> Keluar
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                {/* Search Bar */}
                <div className="px-4 mb-6">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Cari menu..." 
                            className="w-full bg-[#1E293B]/50 border border-gray-800 focus:border-[#EAB308]/50 rounded-xl py-2 pl-9 pr-4 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EAB308]/50 transition-all"
                        />
                    </div>
                </div>
                
                {/* Navigation */}
                <div className="flex-1 overflow-y-auto pb-6 custom-scrollbar" data-lenis-prevent>
                    <nav className="space-y-0.5">
                        <NavItem href={route('dashboard')} routeName="dashboard" icon={LayoutDashboard}>
                            Dashboard
                        </NavItem>
                        
                        <div className="pt-6 pb-2 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Content Management
                        </div>
                        <NavItem href={route('admin.tentang-beranda')} routeName="admin.tentang-beranda" icon={Home}>
                            Tentang Beranda
                        </NavItem>
                        <NavItem href={route('admin.tentang-kami')} routeName="admin.tentang-kami" icon={MonitorPlay}>
                            Tentang Kami
                        </NavItem>
                        <NavItem href={route('admin.layanan.index')} routeName="admin.layanan" icon={BriefcaseBusiness}>
                            Layanan Kami
                        </NavItem>
                        <NavItem href={route('admin.proyek.index')} routeName="admin.proyek" icon={Building2}>
                            Proyek
                        </NavItem>
                        <NavItem href={route('admin.blog.index')} routeName="admin.blog" icon={FileText}>
                            Blog
                        </NavItem>
                        <NavItem href={route('admin.video.index')} routeName="admin.video" icon={Play}>
                            Video
                        </NavItem>
                        <NavItem href={route('admin.ulasan.index')} routeName="admin.ulasan" icon={MessageSquare}>
                            Testimoni
                        </NavItem>
                        <NavItem href={route('admin.klien.index')} routeName="admin.klien" icon={Users}>
                            Client
                        </NavItem>
                        <NavItem href={route('admin.mitra.index')} routeName="admin.mitra" icon={Briefcase}>
                            Partner
                        </NavItem>
                        <NavItem href={route('admin.faq.index')} routeName="admin.faq" icon={HelpCircle}>
                            FAQ
                        </NavItem>
                        <NavItem href={route('admin.keunggulan.index')} routeName="admin.keunggulan" icon={Star}>
                            Keunggulan
                        </NavItem>
                        <NavItem href={route('admin.karir.index')} routeName="admin.karir" icon={UserIcon}>
                            Karir
                        </NavItem>

                        <div className="pt-6 pb-2 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Pengaturan
                        </div>
                        <NavItem href={route('admin.pengaturan')} routeName="admin.pengaturan" icon={Settings}>
                            Pengaturan Website
                        </NavItem>
                    </nav>
                </div>

                {/* Bottom Area (Logout) */}
                <div className="p-4 border-t border-gray-800 shrink-0">
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button"
                        className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all font-medium text-sm group"
                    >
                        <LogOut size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button 
                            className="xl:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            Lihat Website <ExternalLink size={14} />
                        </a>
                        <button className="flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:bg-gray-100 transition-colors relative">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>
                
                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8" data-lenis-prevent>
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
            
            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255,255,255,0.1);
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(255,255,255,0.2);
                }
                
                /* Main content scrollbar */
                main::-webkit-scrollbar {
                    width: 6px;
                }
                main::-webkit-scrollbar-track {
                    background: transparent;
                }
                main::-webkit-scrollbar-thumb {
                    background-color: #CBD5E1;
                    border-radius: 20px;
                }
                main::-webkit-scrollbar-thumb:hover {
                    background-color: #94A3B8;
                }
            `}</style>
        </div>
    );
}
