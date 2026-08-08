import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    FileText, MessageSquare, Briefcase, Users,
    Settings, Plus, MoreVertical, Building2, PlayCircle,
    HelpCircle, BriefcaseBusiness
} from 'lucide-react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    const StatCard = ({ title, value, icon: Icon, iconColor, bgColor, badge, subtitle }) => (
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgColor} ${iconColor}`}>
                        <Icon size={20} />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-800 mb-1">{title}</h3>
                        <p className="text-2xl font-black text-gray-900 leading-none">{value}</p>
                    </div>
                </div>
                {badge && (
                    <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="text-green-500">↑</span> {badge}
                    </div>
                )}
            </div>
            <p className="text-[10px] text-gray-400 font-medium">{subtitle}</p>
        </div>
    );

    const PageRow = ({ name, description, status, date, author, icon: Icon }) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors -mx-5 px-5">
            <div className="flex items-center gap-4 w-1/3">
                <div className="text-gray-400">
                    <Icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-gray-800">{name}</h4>
                    <p className="text-[10px] text-gray-400">{description}</p>
                </div>
            </div>
            <div className="w-1/6">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {status}
                </span>
            </div>
            <div className="w-1/3">
                <p className="text-[11px] text-gray-800 font-medium">{date}</p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <UserIcon size={10} /> {author}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Edit
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreVertical size={16} />
                </button>
            </div>
        </div>
    );

    const ContentItem = ({ category, categoryColor, title, subtitle, date, author, image }) => (
        <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="w-24 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {category === 'Layanan' && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircle size={24} className="text-white opacity-80" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-bold ${categoryColor} mb-1 block`}>{category}</span>
                <h4 className="text-xs font-bold text-gray-800 truncate mb-0.5">{title}</h4>
                <p className="text-[10px] text-gray-500 truncate mb-1">{subtitle}</p>
                <div className="flex items-center gap-3 text-[9px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-gray-300"></span> {date}</span>
                    <span className="flex items-center gap-1"><UserIcon size={9} /> {author}</span>
                </div>
            </div>
            <button className="p-1 text-gray-300 hover:text-gray-600 rounded-lg shrink-0">
                <MoreVertical size={16} />
            </button>
        </div>
    );

    const UserIcon = ({ size }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    );

    const ActionCard = ({ icon: Icon, title, subtitle, actionText, href, colorClass }) => (
        <Link href={href} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-gray-200 transition-all group flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                    <Icon size={16} />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-gray-800">{title}</h4>
                    <p className="text-[10px] text-gray-400">{subtitle}</p>
                </div>
            </div>
            <div className="mt-auto">
                <div className="w-full py-2 rounded-full border border-gray-100 text-xs font-semibold text-gray-600 group-hover:bg-gray-50 flex items-center justify-center gap-1 transition-colors">
                    {actionText.includes('+') ? <Plus size={14} /> : null}
                    {actionText.replace('+', '').trim()}
                </div>
            </div>
        </Link>
    );

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h1 className="text-[22px] font-extrabold text-gray-900 mb-1 tracking-tight">Dashboard</h1>
                <p className="text-xs text-gray-500">Selamat datang kembali, {user?.name || 'Admin'}! Kelola konten dan informasi website dengan mudah.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
                <StatCard title="Total Halaman" value="28" icon={FileText} iconColor="text-yellow-600" bgColor="bg-yellow-50" badge="12%" subtitle="Halaman aktif" />
                <StatCard title="Total Artikel" value="47" icon={MessageSquare} iconColor="text-red-500" bgColor="bg-red-50" badge="23%" subtitle="Artikel dipublikasikan" />
                <StatCard title="Total Proyek" value="35" icon={Briefcase} iconColor="text-blue-500" bgColor="bg-blue-50" badge="15%" subtitle="Proyek ditampilkan" />
                <StatCard title="Total Testimoni" value="19" icon={MessageSquare} iconColor="text-orange-500" bgColor="bg-orange-50" badge="8%" subtitle="Testimoni client" />
                <StatCard title="Total Client" value="24" icon={Users} iconColor="text-purple-600" bgColor="bg-purple-50" badge="10%" subtitle="Perusahaan client" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                {/* Halaman Website Table */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-sm font-bold text-gray-900">Halaman Website</h2>
                            <p className="text-[11px] text-gray-400 mt-0.5">Kelola konten setiap halaman website</p>
                        </div>
                    </div>
                    
                    <div className="px-5">
                        <div className="flex text-[10px] font-bold text-gray-400 py-3 border-b border-gray-100 uppercase tracking-wider">
                            <div className="w-1/3">Halaman</div>
                            <div className="w-1/6">Status</div>
                            <div className="w-1/3">Terakhir Diperbarui</div>
                            <div className="w-auto">Aksi</div>
                        </div>
                        
                        <div className="flex-1">
                            <PageRow name="Beranda (Home)" description="Kelola konten halaman beranda" status="Published" date="2 Jun 2024, 10:30 WIB" author={user?.name || "Riefky Admin"} icon={Building2} />
                            <PageRow name="Tentang Kami" description="Kelola konten halaman tentang kami" status="Published" date="1 Jun 2024, 14:20 WIB" author={user?.name || "Riefky Admin"} icon={FileText} />
                            <PageRow name="Layanan Kami" description="Kelola konten halaman layanan" status="Published" date="2 Jun 2024, 09:15 WIB" author={user?.name || "Riefky Admin"} icon={Briefcase} />
                            <PageRow name="Proyek" description="Kelola konten halaman proyek" status="Published" date="31 Mei 2024, 16:45 WIB" author={user?.name || "Riefky Admin"} icon={Building2} />
                            <PageRow name="Blog" description="Kelola konten halaman blog" status="Published" date="30 Mei 2024, 11:20 WIB" author={user?.name || "Riefky Admin"} icon={FileText} />
                            <PageRow name="Kontak" description="Kelola informasi kontak & lokasi" status="Published" date="25 Mei 2024, 13:10 WIB" author={user?.name || "Riefky Admin"} icon={FileText} />
                            <PageRow name="FAQ" description="Kelola pertanyaan yang sering diajukan" status="Draft" date="20 Mei 2024, 09:30 WIB" author={user?.name || "Riefky Admin"} icon={HelpCircle} />
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 mt-auto">
                        <button className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 group">
                            Lihat Semua Halaman <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>

                {/* Konten Terbaru */}
                <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-sm font-bold text-gray-900">Konten Terbaru</h2>
                        <button className="text-[10px] font-bold text-gray-500 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50">
                            Lihat Semua
                        </button>
                    </div>
                    <div className="p-3 space-y-1 flex-1">
                        <ContentItem 
                            category="Proyek" categoryColor="text-green-500" 
                            title="Grand City Office Tower" subtitle="Proyek Commercial Building" 
                            date="2 Jun 2024, 10:30 WIB" author={user?.name || "Riefky Admin"} 
                            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
                        />
                        <ContentItem 
                            category="Artikel" categoryColor="text-blue-500" 
                            title="Mengenal Unitized Curtain Wall" subtitle="Teknologi & Material" 
                            date="2 Jun 2024, 09:15 WIB" author={user?.name || "Riefky Admin"} 
                            image="https://images.unsplash.com/photo-1574360741695-156550f2fb4c?auto=format&fit=crop&q=80&w=1956" 
                        />
                        <ContentItem 
                            category="Testimoni" categoryColor="text-orange-500" 
                            title="PT. Wijaya Karya (Persero) Tbk" subtitle="Sangat puas dengan hasil kerja BuildPro" 
                            date="1 Jun 2024, 16:20 WIB" author={user?.name || "Riefky Admin"} 
                            image="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2073" 
                        />
                        <ContentItem 
                            category="Layanan" categoryColor="text-blue-400" 
                            title="Facade Installation" subtitle="Pemasangan facade berkualitas tinggi" 
                            date="1 Jun 2024, 14:10 WIB" author={user?.name || "Riefky Admin"} 
                            image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2831" 
                        />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xs font-bold text-gray-900 mb-3 ml-1">Quick Action</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                    <ActionCard 
                        icon={Briefcase} title="Tambah Proyek" subtitle="Tambahkan proyek baru" 
                        actionText="+ Buat Baru" href={route('admin.proyek.index')} 
                        colorClass="bg-green-50 text-green-600" 
                    />
                    <ActionCard 
                        icon={FileText} title="Buat Artikel" subtitle="Tulis artikel atau berita baru" 
                        actionText="+ Buat Baru" href={route('admin.blog.index')} 
                        colorClass="bg-red-50 text-red-500" 
                    />
                    <ActionCard 
                        icon={BriefcaseBusiness} title="Kelola Layanan" subtitle="Kelola daftar layanan" 
                        actionText="Kelola" href={route('admin.layanan.index')} 
                        colorClass="bg-blue-50 text-blue-500" 
                    />
                    <ActionCard 
                        icon={Users} title="Kelola Client" subtitle="Tambah atau edit client" 
                        actionText="Kelola" href={route('admin.klien.index')} 
                        colorClass="bg-orange-50 text-orange-500" 
                    />
                    <ActionCard 
                        icon={Settings} title="Pengaturan Website" subtitle="Ubah pengaturan situs" 
                        actionText="Atur" href={route('admin.pengaturan')} 
                        colorClass="bg-purple-50 text-purple-600" 
                    />
                </div>
            </div>
            
            <div className="mt-10 flex justify-between items-center text-[10px] text-gray-400 pb-4">
                <p>© 2024 WMU Construction. All rights reserved.</p>
                <div className="flex gap-4">
                    <span>Version 1.0.0</span>
                    <span>Made with ❤️ for WMU</span>
                </div>
            </div>
        </AdminLayout>
    );
}
