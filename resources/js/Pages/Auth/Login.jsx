import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { HardHat, ArrowRight, Lock } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-wmu-dark font-sans overflow-hidden">
            <Head title="Login Admin - WMU" />

            {/* Background Construction Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Konstruksi Bangunan"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-wmu-dark via-wmu-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/60 to-transparent"></div>
            </div>

            <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 min-h-[600px] pb-16 sm:pb-16 lg:pb-8">

                {/* Left Side - Typography & Branding */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 text-white text-center lg:text-left"
                >
                    <Link href="/" className="inline-block mb-6 group lg:-ml-28 xl:-ml-36">
                        <img
                            src="/images/logonobg.png"
                            alt="WMU Logo"
                            className="h-32 sm:h-48 md:h-56 lg:h-72 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl origin-left"
                        />
                    </Link>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Sistem Kontrol <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-wmu-accent to-green-300">
                            Manajemen Proyek
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed lg:border-l-4 border-wmu-accent lg:pl-4">
                        Akses khusus portal administrasi PT Winmulyautama. Mengelola data klien, layanan, portofolio proyek, dan memantau kemajuan pembangunan secara terpadu.
                    </p>
                </motion.div>

                {/* Right Side - Login Glass Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-[450px] shrink-0"
                >
                    <div className="backdrop-blur-xl bg-white/10 p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">

                        {/* Subtle glow inside card */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-wmu-accent rounded-full filter blur-[60px] opacity-20 -mr-10 -mt-10"></div>

                        <div className="text-center mb-8 relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 backdrop-blur-md">
                                <Lock className="text-wmu-accent" size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Otorisasi Akses</h2>
                            <p className="text-gray-400 text-sm">Harap masuk untuk melanjutkan ke panel dasbor.</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-lg bg-green-500/20 text-sm font-medium text-green-300 border border-green-500/30 backdrop-blur-md relative z-10">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5 relative z-10">
                            <div>
                                <InputLabel htmlFor="email" value="Alamat Email" className="!text-gray-200 mb-2 font-medium" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full px-4 py-3 rounded-xl border-white/10 bg-white/5 text-white placeholder-gray-400 focus:border-wmu-accent focus:ring-wmu-accent shadow-inner transition-all backdrop-blur-md"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@winmulyautama.com"
                                />
                                <InputError message={errors.email} className="mt-2 text-red-400" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Kata Sandi" className="!text-gray-200 mb-2 font-medium" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full px-4 py-3 rounded-xl border-white/10 bg-white/5 text-white placeholder-gray-400 focus:border-wmu-accent focus:ring-wmu-accent shadow-inner transition-all backdrop-blur-md"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} className="mt-2 text-red-400" />
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <label className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="text-wmu-accent focus:ring-wmu-accent bg-white/10 border-white/20 rounded"
                                    />
                                    <span className="ms-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                                        Ingat sesi ini
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-wmu-accent hover:text-green-300 transition-colors"
                                    >
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center bg-wmu-accent hover:bg-[#00A352] text-white py-3.5 px-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,191,98,0.3)] hover:shadow-[0_0_30px_rgba(0,191,98,0.5)] disabled:opacity-70 group"
                                >
                                    {processing ? 'Otentikasi...' : (
                                        <>
                                            Login Panel <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Simple footer note */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 font-medium z-10 pointer-events-none">
                Sistem Informasi PT Winmulyautama &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
}
