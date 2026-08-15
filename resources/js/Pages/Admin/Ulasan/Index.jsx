import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Star, Plus, Pencil, Trash2, Eye, EyeOff, CheckCircle2, XCircle, MessageSquare, TrendingUp } from 'lucide-react';

function StarRating({ rating, max = 5 }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star key={i} size={13}
                    className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                />
            ))}
        </div>
    );
}
