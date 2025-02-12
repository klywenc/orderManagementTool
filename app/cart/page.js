'use client';
import { useCart } from '@/app/contexts/CartContext';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const { cartItems, removeItemFromCart, updateItemQuantity, clearCart } = useCart();
    const router = useRouter();

    const handleQuantityChange = (itemId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            if (newQuantity === 0) {
                removeItemFromCart(itemId);
            } else {
                updateItemQuantity(itemId, newQuantity);
            }
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Twój <span className="text-orange-600">Koszyk</span>
                    </h1>
                </div>

                <div className="p-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-600 text-lg">Twój koszyk jest pusty.</p>
                            <Link href="/" className="text-orange-600 hover:underline mt-4 block">
                                Wróć do sklepu
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Produkt</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cena</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ilość</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                        <div className="text-sm text-gray-500">{item.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.price.toFixed(2)} zł</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="number"
                                                    id={`quantity-${item.id}`}
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e)}
                                                    className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => removeItemFromCart(item.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Usuń
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                        <div>
                            <p className="text-xl font-semibold text-gray-800">
                                Suma: <span className="text-orange-600">{totalPrice.toFixed(2)} zł</span>
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={clearCart}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
                            >
                                Wyczyść koszyk
                            </button>
                            <button
                                onClick={() => router.push('/checkout')}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-200"
                            >
                                Przejdź do kasy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;