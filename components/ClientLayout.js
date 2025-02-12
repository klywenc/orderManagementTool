
'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from '@/components/loading/Loading';

export default function ClientLayout({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(true);

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [pathname, searchParams]);

    return (
        <>
            {isLoading && <Loading />}
            {children}
        </>
    );
}