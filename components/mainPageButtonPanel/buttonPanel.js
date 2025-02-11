'use client'

import Link from "next/link";
import {useSession} from "next-auth/react";

const MainButtonPanel = () => {
    const { data: session } = useSession();

    return (
        <section className="relative w-full max-w-3xl mx-auto mb-10">
            <Link href="/menu"
                  className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transition-colors duration-200 mb-4">
                Zobacz Menu
            </Link>
            <br/>
            {!session && (
                <Link href="/login"
                      className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transition-colors duration-200">
                    Zaloguj się
                </Link>
            )}
        </section>
    );
};

export default MainButtonPanel;
