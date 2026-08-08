import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap items-center justify-end gap-1">
            {links.map((link, k) => (
                <div key={k}>
                    {link.url === null ? (
                        <div
                            className="px-3 py-1.5 text-sm text-gray-400 border border-transparent rounded-lg"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <Link
                            href={link.url}
                            className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                                link.active
                                    ? 'bg-wmu-dark text-white border-wmu-dark'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
