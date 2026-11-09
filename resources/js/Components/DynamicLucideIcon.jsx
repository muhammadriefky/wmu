import {
    Award, BadgeCheck, Briefcase, Building, Building2, CheckCircle2, Clock, Construction,
    DollarSign, Factory, FileText, Gem, Hammer, Handshake, HardHat, Headphones, Heart,
    HeartHandshake, Home, Layers, Leaf, Lightbulb, MapPin, Medal, Package, PenTool, Phone,
    Rocket, Ruler, Settings, Shield, ShieldCheck, Smile, Star, Tag, Target, ThumbsUp, Timer,
    TrendingUp, Trophy, Truck, UserCheck, Users, Wallet, Wrench, Zap,
} from 'lucide-react';

/**
 * Ikon yang bisa dipilih admin untuk konten publik (Keunggulan, dll.).
 * Sengaja dibatasi: memuat seluruh ~1.500 ikon Lucide di halaman publik
 * menambah ratusan kB ke bundle beranda.
 */
export const SUPPORTED_ICONS = {
    Award, BadgeCheck, Briefcase, Building, Building2, CheckCircle2, Clock, Construction,
    DollarSign, Factory, FileText, Gem, Hammer, Handshake, HardHat, Headphones, Heart,
    HeartHandshake, Home, Layers, Leaf, Lightbulb, MapPin, Medal, Package, PenTool, Phone,
    Rocket, Ruler, Settings, Shield, ShieldCheck, Smile, Star, Tag, Target, ThumbsUp, Timer,
    TrendingUp, Trophy, Truck, UserCheck, Users, Wallet, Wrench, Zap,
};

export const SUPPORTED_ICON_NAMES = Object.keys(SUPPORTED_ICONS);

/** Terima "ShieldCheck", "shield-check", "shield check" (tidak case-sensitive). */
function resolveIcon(name) {
    if (!name) return null;
    if (SUPPORTED_ICONS[name]) return SUPPORTED_ICONS[name];
    const normalized = String(name).replace(/[\s_-]+/g, '').toLowerCase();
    const key = SUPPORTED_ICON_NAMES.find(k => k.toLowerCase() === normalized);
    return key ? SUPPORTED_ICONS[key] : null;
}

/**
 * Render ikon berdasarkan nama yang disimpan admin. Jika nama kosong atau
 * tidak didukung, `fallback` (elemen React) yang dirender.
 */
export default function DynamicLucideIcon({ name, fallback = null, ...props }) {
    const Icon = resolveIcon(name);
    return Icon ? <Icon {...props} /> : fallback;
}
