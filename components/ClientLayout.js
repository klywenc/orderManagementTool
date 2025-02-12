'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from '@/components/loading/Loading';

function SearchParamsWrapper({ children }) {
    const searchParams = useSearchParams();
    return children(searchParams);
}

export default function ClientLayout({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsLoading(true);

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <>
            {isLoading && <Loading />}
            <Suspense fallback={<Loading />}>
                <SearchParamsWrapper>
                    {(searchParams) => {
                        return children;
                    }}
                </SearchParamsWrapper>
            </Suspense>
        </>
    );
}