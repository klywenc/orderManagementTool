// components/ClientLayout.js
'use client'; // Ten komponent jest kliencki

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from '@/components/loading/Loading';

export default function ClientLayout({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(true); // Rozpocznij ładowanie przy zmianie trasy

        const timeout = setTimeout(() => {
            setIsLoading(false); // Zakończ ładowanie po krótkim opóźnieniu (symulacja)
        }, 500); // Możesz dostosować opóźnienie

        return () => clearTimeout(timeout); // Wyczyść timeout przy odmontowaniu
    }, [pathname, searchParams]); // Reaguj na zmiany w pathname i searchParams

    return (
        <>
            {isLoading && <Loading />}
            {children}
        </>
    );
}