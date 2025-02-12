'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function NotFoundContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'Page not found';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="text-lg text-gray-600">{message}</p>
        </div>
    );
}

export default function NotFoundPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotFoundContent />
        </Suspense>
    );
}