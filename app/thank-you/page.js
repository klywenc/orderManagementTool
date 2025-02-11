'use client';

import { useEffect, useState } from 'react';

const ThankYouPage = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch('/api/orders'); // Poprawiona ścieżka
                if (!res.ok) throw new Error('Błąd ładowania zamówienia');
                const data = await res.json();
                setOrder(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, []);

    // Funkcja do obsługi pobierania faktury
    const handleDownloadInvoice = async () => {
        try {
            const res = await fetch(`/api/orders/${order.id}/e-invoice`); // Ścieżka do generowania faktury
            if (!res.ok) throw new Error('Błąd podczas generowania faktury');

            // Pobieranie pliku PDF
            const blob = await res.blob(); // Pobierz plik jako blob
            const url = window.URL.createObjectURL(blob); // Utwórz URL dla pliku
            const link = document.createElement('a'); // Utwórz link do pobrania
            link.href = url;
            link.download = `faktura_${order.id}.pdf`; // Ustal nazwę pliku
            document.body.appendChild(link);
            link.click(); // Kliknij, aby pobrać
            link.remove(); // Usuń link po kliknięciu
        } catch (error) {
            console.error('Błąd podczas pobierania faktury:', error);
        }
    };

    if (loading) return <p className="text-center text-lg">Ładowanie...</p>;
    if (!order) return <p className="text-center text-lg text-red-500">Nie znaleziono zamówienia.</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Dziękujemy za zamówienie!</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Podsumowanie zamówienia</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Produkt</th>
                        <th className="border border-gray-300 px-4 py-2">Ilość</th>
                        <th className="border border-gray-300 px-4 py-2">Cena</th>
                        <th className="border border-gray-300 px-4 py-2">Łącznie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.items.map(item => (
                        <tr key={item.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.price.toFixed(2)} zł</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(item.price * item.quantity).toFixed(2)} zł
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <p className="text-xl font-bold mt-6 text-right">
                    Suma: <span className="text-green-600">{order.total.toFixed(2)} zł</span>
                </p>
            </div>

            <div className="text-center mt-6">
                {/* Przycisk do pobrania faktury */}
                <button
                    onClick={handleDownloadInvoice}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600 transition"
                >
                    Pobierz fakturę
                </button>
                <div className="mt-4">
                    <a href="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition">
                        Powrót do strony głównej
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
