import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout>
            <Head title="Profil Akun" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profil Akun</h2>
                <p className="text-sm text-gray-500 mt-1">Kelola informasi akun, kata sandi, dan keamanan akun Anda.</p>
            </div>

            <div className="max-w-3xl space-y-6">
                <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
