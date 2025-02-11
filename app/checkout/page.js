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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Podsumowanie zamówienia</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id} className="mb-2">
                        {item.name} - {item.quantity} szt. - {item.price.toFixed(2)} zł
                    </li>
                ))}
            </ul>
            <button
                onClick={handleOrderSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                {loading ? 'Przetwarzanie...' : 'Złóż zamówienie'}
            </button>
        </div>
    );
};

export default CheckoutPage;