'use client';

import { useEffect, useState } from 'react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders?type=all'); // Pobiera wszystkie zamówienia użytkownika
                if (!res.ok) throw new Error('Błąd ładowania zamówień');
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Błąd pobierania zamówień:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDownloadInvoice = async (orderId) => {
        try {
            const res = await fetch(`/api/orders/${orderId}/e-invoice`);
            if (!res.ok) throw new Error('Błąd podczas generowania faktury');
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `faktura_${orderId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Błąd podczas pobierania faktury:', error);
        }
    };

    if (loading) return <p className="text-center text-lg">Ładowanie...</p>;
    if (orders.length === 0) return <p className="text-center text-lg text-red-500">Brak zamówień.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Twoje zamówienia</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">ID Zamówienia</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Suma</th>
                        <th className="border border-gray-300 px-4 py-2">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.total.toFixed(2)} zł</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleDownloadInvoice(order.id)}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
                                >
                                    Pobierz fakturę
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPage;
