'use client';

import { useEffect, useState } from 'react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders?type=all'); // Pobiera wszystkie zamówienia użytkownika
                if (!res.ok) {
                    const message = await res.text(); // Get error message from response
                    throw new Error(`Błąd ładowania zamówień: ${res.status} - ${message}`);
                }
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Błąd pobierania zamówień:', err);
                setError(err.message || 'Wystąpił błąd podczas pobierania zamówień.'); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDownloadInvoice = async (orderId) => {
        try {
            const res = await fetch(`/api/orders/${orderId}/e-invoice`);
            if (!res.ok) {
                const message = await res.text();
                throw new Error(`Błąd podczas generowania faktury: ${res.status} - ${message}`);
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `faktura_${orderId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Błąd podczas pobierania faktury:', err);
            setError(err.message || 'Wystąpił błąd podczas pobierania faktury.'); // Set error message
        }
    };

    if (loading) return <p className="text-center text-lg text-gray-600">Ładowanie zamówień...</p>;

    if (error) return <p className="text-center text-lg text-red-500">Wystąpił błąd: {error}</p>;

    if (orders.length === 0) return <p className="text-center text-lg text-gray-600">Brak zamówień.</p>;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Twoje <span className="text-orange-600">Zamówienia</span>
                    </h1>
                </div>

                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID Zamówienia</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Suma</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider text-right">Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.total.toFixed(2)} zł</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDownloadInvoice(order.id)}
                                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            </div>
        </div>
    );
};

export default OrdersPage;