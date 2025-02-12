'use client';

import { useEffect, useState } from 'react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/orders?type=all');
                if (!res.ok) {
                    let errorMessage = `Błąd ładowania zamówień: ${res.status}`;
                    try {
                        const errorData = await res.json();
                        if (errorData && errorData.message) {
                            errorMessage += ` - ${errorData.message}`;
                        } else {
                            const textMessage = await res.text();
                            errorMessage += ` - ${textMessage}`;
                        }
                    } catch (parseError) {
                        console.error('Błąd parsowania JSON odpowiedzi błedu:', parseError);
                        const textMessage = await res.text();
                        errorMessage += ` - ${textMessage}`;
                    }
                    throw new Error(errorMessage);
                }
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Błąd pobierania zamówień:', err);
                setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas pobierania zamówień.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDownloadInvoice = async (orderId) => {
        setError(null);
        try {
            const res = await fetch(`/api/orders/${orderId}/e-invoice`);
            if (!res.ok) {
                let errorMessage = `Błąd podczas generowania faktury: ${res.status}`;
                try {
                    const errorData = await res.json();
                    if (errorData && errorData.message) {
                        errorMessage += ` - ${errorData.message}`;
                    } else {
                        const textMessage = await res.text();
                        errorMessage += ` - ${textMessage}`;
                    }
                } catch (parseError) {
                    console.error('Błąd parsowania JSON odpowiedzi błedu faktury:', parseError);
                    const textMessage = await res.text();
                    errorMessage += ` - ${textMessage}`;
                }
                throw new Error(errorMessage);
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
            setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas pobierania faktury.');
        }
    };

    const statusToPolish = {
        pending: 'Oczekujące',
        preparing: 'W przygotowaniu',
        completed: 'Zakończone',
        cancelled: 'Anulowane',
    };

    const statusColors = {
        pending: {
            textColor: 'text-gray-700',
            bgColor: 'bg-gray-100',
            borderColor: 'border-gray-200',
        },
        preparing: {
            textColor: 'text-orange-700',
            bgColor: 'bg-orange-100',
            borderColor: 'border-orange-200',
        },
        completed: {
            textColor: 'text-green-700',
            bgColor: 'bg-green-100',
            borderColor: 'border-green-200',
        },
        cancelled: {
            textColor: 'text-red-700',
            bgColor: 'bg-red-100',
            borderColor: 'border-red-200',
        },
    };

    if (loading) return <p className="text-center text-lg text-gray-600">Ładowanie zamówień...</p>;

    if (error) return <p className="text-center text-lg text-red-500">Wystąpił błąd: {error}</p>;

    if (orders.length === 0) return <p className="text-center text-lg text-gray-600">Brak zamówień.</p>;

    return (
        <div className="min-h-screen p-8 font-sans">
            <div className="container mx-auto">
                <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 shadow-md">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Twoje <span className="text-black">Zamówienia</span>
                        </h1>
                    </div>

                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID
                                        Zamówienia
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Suma</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider text-right">Akcje</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {/* Dynamic badge styles based on status */}
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${statusColors[order.status]?.bgColor || 'bg-gray-100'} ${statusColors[order.status]?.textColor || 'text-gray-800'} border ${statusColors[order.status]?.borderColor || 'border-gray-200'}`}>
                                                {statusToPolish[order.status] || order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">zł {order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDownloadInvoice(order.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        </div>
    );
};

export default OrdersPage;