'use client';

import { useCart } from '@/app/contexts/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CheckoutPage = () => {
    const { cartItems, finalizeOrder } = useCart();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
        return <p className="text-center text-xl">Musisz być zalogowany, aby złożyć zamówienie.</p>;
    }

    if (cartItems.length === 0) {
        return <p className="text-center text-xl">Koszyk jest pusty.</p>;
    }

    const handleOrderSubmit = async () => {
        setLoading(true);
        await finalizeOrder();
        setLoading(false);
        router.push('/thank-you');
    };

    return (
        <main className="flex items-start justify-center bg-gray-100 pt-12 pb-10">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    <span className="text-orange-600">Podsumowanie</span> zamówienia
                </h1>

                <table className="min-w-full table-auto border-separate border-spacing-0 mb-26">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Produkt</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Ilość</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Cena</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Suma</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {cartItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{item.quantity} szt.</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{item.price.toFixed(2)} zł</td>
                            <td className="px-6 py-4 text-sm text-gray-800">
                                {(item.price * item.quantity).toFixed(2)} zł
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mb-6">
                    <p className="text-lg font-semibold text-gray-800">
                        Suma: <span
                        className="text-orange-600">{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} zł</span>
                    </p>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleOrderSubmit}
                        disabled={loading}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full md:w-auto transition-colors duration-200"
                    >
                        {loading ? 'Przetwarzanie...' : 'Złóż zamówienie'}
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;